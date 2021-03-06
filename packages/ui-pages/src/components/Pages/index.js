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

import View from '@instructure/ui-layout/lib/components/View'

import themeable from '@instructure/ui-themeable'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import findTabbable from '@instructure/ui-a11y/lib/utils/findTabbable'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'
import error from '@instructure/ui-utils/lib/error'

import Page from './Page'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
class Pages extends Component {
  static Page = Page

  static propTypes = {
    children: CustomPropTypes.Children.oneOf([
      Page
    ]),

    defaultPageIndex: PropTypes.number,

    /**
     * The currently active page index
     */
    activePageIndex: CustomPropTypes.controllable(PropTypes.number, 'onPageIndexChange', 'defaultPageIndex'),

    /**
     * Event handler fired anytime page index has changed due to back button being clicked
     */
    onPageIndexChange: PropTypes.func,

    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    children: null,
    defaultPageIndex: null,
    activePageIndex: 0,
    onPageIndexChange: function () {}
  }

  static childContextTypes = {
    history: PropTypes.array,
    navigateToPreviousPage: PropTypes.func
  }

  _timeouts = []

  constructor (props) {
    super(props)

    this._history = [
      typeof props.defaultPageIndex === 'number' ?
      props.defaultPageIndex :
      props.activePageIndex
    ]

    this._contentId = generateElementId('Pages')
  }

  getChildContext () {
    return {
      history: this._history,
      navigateToPreviousPage: () => {
        this.handleBackButtonClick()
      }
    }
  }

  handleBackButtonClick = () => {
    const oldPageIndex = this._history.pop()
    const newPageIndex = this._history[this._history.length - 1]
    this.props.onPageIndexChange(newPageIndex || 0, oldPageIndex)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps && typeof nextProps.activePageIndex === 'number' &&
        (
          this._history.length === 0 ||
          nextProps.activePageIndex !== this._history[this._history.length - 1]
        )
    ) {
      this._history.push(nextProps.activePageIndex)
    }
  }

  componentDidUpdate () {
    this._timeouts.push(
      setTimeout(() => {
        !this.focused && this.focus()
      }, 0)
    )
  }

  componentWillUnmount () {
    this._timeouts.forEach(clearTimeout)
  }

  get focused () {
    return containsActiveElement(this._contentElement)
  }

  focus () {
    this._timeouts.push(setTimeout(() => {
      const activePage = this._activePage

      // Attempt to focus active page
      if (activePage && activePage.focusable) {
        activePage.focus()
      } else {
        // Use first tabbable as last ditch effort
        const tabbable = findTabbable(this._contentElement)
        const element = tabbable && tabbable[0]

        element && element.focus()
      }
    }))
  }

  get activePage () {
    const { activePageIndex, children } = this.props
    const pages = React.Children.toArray(children)
    const activePage = (activePageIndex < pages.length) ? pages[activePageIndex] : null

    error(activePage, 'Pages', 'Invalid `activePageIndex`.')

    return activePage ? safeCloneElement(activePage, {
      ref: (el) => { this._activePage = el }
    }) : null
  }

  render () {
    return this.activePage ? (
      <View
        as="div"
        id={this._contentId}
        className={styles.root}
        margin={this.props.margin}
        role="region"
        elementRef={(el) => { this._contentElement = el }}
      >
        {this.activePage}
      </View>
    ) : null
  }
}

export default Pages
export { Page }
