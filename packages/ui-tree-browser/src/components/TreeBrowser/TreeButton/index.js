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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import testable from '@instructure/ui-testable'
import Browser from '@instructure/ui-utils/lib/Browser'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TreeBrowser
---
**/

@testable()
@themeable(theme, styles)
export default class TreeButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    focused: PropTypes.bool
  }

  static defaultProps = {
    type: 'treeButton',
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    onClick: function () {}
  }

  renderIcon () {
    const { type } = this.props
    switch (type) {
      case 'collection':
        return this.renderCollectionIcon()
      case 'item':
        return this.renderItemIcon()
      default:
        break
    }
  }

  renderCollectionIcon () {
    const Icon = this.props.expanded
      ? this.props.collectionIconExpanded : this.props.collectionIcon
    if (Icon) {
      return <Icon className={styles.icon} />
    }
  }

  renderItemIcon () {
    const Icon = this.props.itemIcon
    if (Icon) {
      return <Icon className={styles.icon} />
    }
  }

  render () {
    const {
      name,
      descriptor,
      expanded,
      selected,
      focused,
      variant,
      size
    } = this.props

    const ie11 = Browser.msie && Browser.version > 10

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: expanded,
      [styles.selected]: selected,
      [styles.focused]: focused,
      [styles.ie11]: ie11
    }

    // VoiceOver can't navigate without the buttons, even though they don't do anything
    return (
      <button
        tabIndex={-1}
        type="button"
        className={classnames(classes)}
      >
        <span className={styles.layout}>
          {this.renderIcon()}
          <span className={styles.text}>
            <span className={styles.textName}>
              {name}
            </span>
            {(descriptor)
              ? <span
                className={styles.textDescriptor}
                title={descriptor}
              >
                {descriptor}
              </span> : null
            }
          </span>
        </span>
      </button>
    )
  }
}
