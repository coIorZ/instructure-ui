/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DocsPlugin = require('@instructure/ui-docs-plugin')
const webpack = require('webpack')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const projectRoot = path.resolve(__dirname, '../../')
// eslint-disable-next-line instructure-ui/no-relative-package-imports
const pkg = require('../../package.json')

let plugins = require('@instructure/ui-presets/webpack/plugins')()

plugins = plugins.concat([
  new DocsPlugin({
    projectRoot,
    title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
    favicon: '../../logo.png',
    library: {
      name: pkg.name,
      version: pkg.version,
      repository: pkg.repository.url,
      author: pkg.author,
      packages: 'packages',
      scope: '@instructure',
      codepen: {
        // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
        // this is usually whatever webpack entries you've defined
        js_external: [
          // should match entries in webpack.config.js
          `${pkg.homepage}common.js`,
          `${pkg.homepage}globals.js`
        ].join(';')
      }
    },
    files: [
      '**/*.md',
      'packages/*/src/components/*/**/index.js',
      'packages/*/src/components/**/elements/**/*.js',
      'packages/*/src/components/*/**/README.md',
      'packages/*/src/utils/**/*.js',
      'packages/debounce/src/**/*.js',
      'packages/ui-themeable/src/**/*.js',
      'packages/ui-i18n/src/**/*.js',
      'packages/ui-utils/src/**/*.js',
      'packages/generate-examples/src/**/*.js'
    ],
    ignore: [
      'docs/testing-best-practices.md',
      'packages/**/CHANGELOG.md',
      '**/config/**',
      '**/templates/**',
      '**/controllers/**',
      '**/views/**',
      '**/node_modules/**',
      '**/__docs__/**',
      '**/__examples__/**',
      '**/__svg__/**',
      '**/__fixtures__/**',
      '**/__testfixtures__/**',
      '**/__tests__/**',
      '**/locales/**',
      '**/theme.js',

      '**/src/index.js',
      '**/src/components/index.js',
      '**/src/utils/index.js',
      'packages/ui-utils/src/index.js',
      'packages/ui-utils/src/{react,dom}/index.js',

      'packages/ui-test-utils/**',

      'packages/ui-docs-client/src/**',
      'packages/ui-docs-plugin/src/**',
      'packages/media-capture/src/**',

      'packages/ui-container/**',
      'packages/ui-core/**',
      'packages/ui-elements/src/components/ContextBox/**',
      'packages/ui-forms/src/components/FormField/**',
      'packages/ui-forms/src/components/FormFieldGroup/**',
      'packages/ui-forms/src/utils/FormPropTypes.js',

      'packages/ui-utils/src/i18n/*.js',
      'packages/ui-utils/src/dom/calculateElementPosition.js',
      'packages/ui-utils/src/dom/findTabbable.js',
      'packages/ui-utils/src/dom/focusManager.js',
      'packages/ui-utils/src/dom/scopeTab.js',
      'packages/ui-utils/src/dom/isVisible.js',
      'packages/ui-utils/src/debounce.js',
      'packages/ui-utils/src/react/containerQuery.js',
      'packages/ui-utils/src/Decimal.js'
    ],
    themes: [
      require.resolve('@instructure/ui-themes/lib/canvas/base'),
      require.resolve('@instructure/ui-themes/lib/canvas/high-contrast')
    ],
    icons: {
      packageName: '@instructure/ui-icons',
      formats: {
        React: '@instructure/ui-icons/lib',
        SVG: '@instructure/ui-icons/lib/svg',
        Font: '@instructure/ui-icons/lib/font'
      }
    },
    template: './index.ejs'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    // should match entries in webpack.config.js
    // the ui-docs entry is generated by the ui-docs-plugin
    name: ['common', 'globals'].reverse(),
    minChunks: Infinity
  })
])

if (!DEBUG) {
  plugins = plugins.concat([
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ecma: 5,
        mangle: false, // leaves variable names as-is so it is easier to debug, gzip takes care of most of this anyway
        compress: {
          sequences: false // prevents it from combining a bunch of statements with ","s so it is easier to set breakpoints
        },
        output: {
          semicolons: false // prevents everything being on one line so it's easer to read in devtools
        }
      }
    })
  ])
}

module.exports = plugins
