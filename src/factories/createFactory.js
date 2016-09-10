import _ from 'lodash'
import cx from 'classnames'
import React, { cloneElement, isValidElement } from 'react'

/**
 * The default CreateFactory mergeProps function.  Merges props and classNames.
 * @param props
 * @param extraProps
 * @returns {{className: *}}
 */
const mergePropsAndClassName = (...props) => props.reduce((acc, next) => {
  const className = cx(acc.className, next.className)
  acc = { ...acc, ...next }
  if (className) acc.className = className
  return acc
}, {})

/**
 * Return a function that produces ReactElements.  Similar to React.createFactory with some extras.
 * If the returned factory is passed a ReactElement it will be cloned.
 * If it passed null or undefined it will do nothing.
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @param {function} [mergeProps=mergePropsAndClassName]
 * @returns {function}
 */
const createFactory = (Component, mapValueToProps, mergeProps = mergePropsAndClassName) => {
  return function Factory(val, extraProps = {}) {
    const baseProps = mapValueToProps()

    // Clone ReactElements
    if (isValidElement(val)) {
      return cloneElement(val, mergeProps(baseProps, val.props, extraProps))
    }

    // Create ReactElements from props objects
    if (_.isPlainObject(val)) {
      return <Component {...mergeProps(baseProps, val, extraProps)} />
    }

    // Map values to props and create an ReactElement
    if (!_.isNil(val)) {
      return <Component {...mergeProps(baseProps, mapValueToProps(val), extraProps)} />
    }
  }
}

export default createFactory
