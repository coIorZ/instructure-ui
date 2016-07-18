import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import themeable from '../../util/themeable'

import {
  IconCompleteSolid,
  IconInfoSolid,
  IconWarningSolid,
  IconXSolid
} from 'instructure-icons'

import Button from '../Button'
import ScreenReaderContent from '../ScreenReaderContent'

import styles from './Alert.css'
import themeVariables from './theme/Alert'
import themeStyles from './theme/Alert.css'

/**
  Alert Component Success, Info, Error, Warning

  ```jsx_example
  <div>
    <Alert variant="success" closeButtonLabel="Close" isDismissable>
      Success: Sample alert text.
    </Alert>

    <Alert variant="info" closeButtonLabel="Close" isDismissable>
      Error: Sample alert text.
    </Alert>

    <Alert variant="error" closeButtonLabel="Close" isDismissable>
      Error: Sample alert text. This text continues for a while
      to demonstrate what happens when the content stretches over
      several lines.
    </Alert>

    <Alert variant="warning" closeButtonLabel="Close" isDismissable>
      Error: Sample alert text.
    </Alert>
  </div>
  ```
**/

@themeable(themeVariables, themeStyles)
export default class Alert extends Component {
  static propTypes = {
    /**
    * content to be rendered within Alert
    */
    children: PropTypes.node,
    /**
    * Determines color and icon
    */
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    /**
    * the alert can be dismissed/closed
    */
    isDismissable: PropTypes.bool,
    /**
    * accessible label for the 'Close' button (required if `isDismissable`)
    */
    closeButtonLabel: PropTypes.string,
    /**
    * function to be called when close button is clicked (required if `isDismissable`)
    */
    onClose: PropTypes.func
  }

  static defaultProps = {
    isDismissable: false,
    variant: 'info'
  }

  variantUI () {
    return {
      error: {
        Icon: IconWarningSolid,
        classNames: classNames(styles.alert, styles.error)
      },
      info: {
        Icon: IconInfoSolid,
        classNames: classNames(styles.alert, styles.info)
      },
      success: {
        Icon: IconCompleteSolid,
        classNames: classNames(styles.alert, styles.success)
      },
      warning: {
        Icon: IconWarningSolid,
        classNames: classNames(styles.alert, styles.warning)
      }
    }[this.props.variant]
  }

  renderIcon () {
    const { Icon } = this.variantUI()
    return (
      <div className={styles.icon}>
        <Icon className={styles.alertIcon} />
      </div>
    )
  }

  renderCloseButton () {
    return (
      <div className={styles.closeButton}>
        <Button
          onClick={this.props.onClose}
          variant="link">
          <span className={styles.closeIcon}>
            <IconXSolid />
          </span>
          <ScreenReaderContent>
            {this.props.closeButtonLabel}
          </ScreenReaderContent>
        </Button>
      </div>
    )
  }

  render () {
    const { classNames } = this.variantUI()
    return (
      <div className={classNames}>
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
        {this.props.isDismissable && this.renderCloseButton()}
      </div>
    )
  }
}