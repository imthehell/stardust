import cx from 'classnames'
import React, { PropTypes } from 'react'

import { getElementType, getUnhandledProps, META } from '../../lib'

/**
 * Header content wraps the main content when there is an adjacent Icon or Image.
 */
function HeaderContent(props) {
  const { className, children } = props
  const classes = cx(className, 'content')
  const rest = getUnhandledProps(HeaderContent, props)
  const ElementType = getElementType(HeaderContent, props)

  return <ElementType {...rest} className={classes}>{children}</ElementType>
}

HeaderContent._meta = {
  name: 'HeaderContent',
  parent: 'Header',
  type: META.TYPES.VIEW,
}

HeaderContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

  /** Primary content */
  children: PropTypes.node,

  /** Classes that will be added to the HeaderContent className */
  className: PropTypes.string,
}

export default HeaderContent
