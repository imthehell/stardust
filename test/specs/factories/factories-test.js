import _ from 'lodash'
import React, { isValidElement } from 'react'

import {
  createIcon,
  createImage,
  createHTMLImg,
  createLabel,
  createFactory,
} from 'src/factories'

import {
  Icon,
  Image,
  Label,
} from 'src/elements'

describe.only('createFactory', () => {
  it('returns a function', () => {
    expect(createFactory()).to.be.a('function')
  })

  describe('from DOM component', () => {
    const createDiv = createFactory('div', val => ({ 'data-mapped': val, className: 'base-class' }))

    describe('with a string', () => {
      const value = 'foo'

      it('creates valid elements from strings', () => {
        isValidElement(createDiv(value)).should.equal(true)
      })
      it('maps the value to the specified prop', () => {
        shallow(createDiv(value))
          .should.have.prop('data-mapped', value)
      })
      it('merges additional props', () => {
        const wrapper = shallow(createDiv(value, { 'data-extra': true }))
        wrapper.should.have.className('base-class')
        wrapper.should.have.prop('data-mapped', value)
        wrapper.should.have.prop('data-extra', true)
      })
      it('merges className', () => {
        shallow(createDiv(value)).should.have.className('base-class')

        const wrapper = shallow(createDiv(value, { className: 'extra-class' }))
        wrapper.should.have.className('base-class')
        wrapper.should.have.className('extra-class')
      })
    })

    describe('with a props object', () => {
      const value = { 'data-prop': 'foo' }

      it('creates valid elements from strings', () => {
        isValidElement(createDiv(value)).should.equal(true)
      })
      it('merges additional props', () => {
        const wrapper = shallow(createDiv(value, { 'data-extra': 'bar' }))
        wrapper.should.have.className('base-class')
        wrapper.should.have.prop('data-prop', 'foo')
        wrapper.should.have.prop('data-extra', 'bar')
      })
      it('merges className', () => {
        shallow(createDiv(value)).should.have.className('base-class')

        const wrapper = shallow(createDiv(value, { className: 'extra-class' }))
        wrapper.should.have.className('base-class')
        wrapper.should.have.className('extra-class')
      })
    })

    describe('with another element', () => {
      const value = createDiv(<div data-element />)

      it('creates valid elements from strings', () => {
        isValidElement(createDiv(value)).should.equal(true)
      })
      it('merges additional props', () => {
        const wrapper = shallow(createDiv(value, { 'data-extra': 'bar' }))
        wrapper.should.have.className('base-class')
        wrapper.should.have.prop('data-element', true)
        wrapper.should.have.prop('data-extra', 'bar')
      })
      it('merges className', () => {
        shallow(createDiv(value)).should.have.className('base-class')

        const wrapper = shallow(createDiv(value, { className: 'extra-class' }))
        wrapper.should.have.className('base-class')
        wrapper.should.have.className('extra-class')
      })
    })
  })

  // TODO: composite component createFactory tests

  describe('factories', () => {
    const assertFactory = (factory, value, props) => {
      const wrapper = shallow(factory(value))

      _.each(props, (propValue, propName) => {
        if (propName === 'className') {
          _.each(propValue.split(' '), className => {
            wrapper.should.have.className(className)
          })
        } else {
          wrapper.should.have.prop(propName, propValue)
        }
      })
    }

    // TODO: make these DRY
    describe('createIcon', () => {
      const expectedProps = { className: 'foo icon' }

      it('crates a Icon from a string', () => {
        assertFactory(createIcon, 'foo', expectedProps)
      })
      it('crates a Icon from an object', () => {
        assertFactory(createIcon, { name: 'foo' }, expectedProps)
      })
      it('crates a Icon from a Icon element', () => {
        assertFactory(createIcon, <Icon name='foo' />, expectedProps)
      })
    })

    describe('createImage', () => {
      const expectedProps = { src: 'foo', className: 'ui image' }

      it('crates a Image from a string', () => {
        assertFactory(createImage, 'foo', expectedProps)
      })
      it('crates a Image from an object', () => {
        assertFactory(createImage, { src: 'foo' }, expectedProps)
      })
      it('crates a Image from a Image element', () => {
        assertFactory(createImage, <Image src='foo' />, expectedProps)
      })
    })

    describe('createHTMLImg', () => {
      const expectedProps = { src: 'foo' }

      it('crates a img from a string', () => {
        assertFactory(createHTMLImg, 'foo', expectedProps)
      })
      it('crates a img from an object', () => {
        assertFactory(createHTMLImg, { src: 'foo' }, expectedProps)
      })
      it('crates a img from a img element', () => {
        assertFactory(createHTMLImg, <img src='foo' />, expectedProps)
      })
    })

    describe('createLabel', () => {
      const expectedProps = { children: 'foo', className: 'ui label' }

      it('crates a Label from a string', () => {
        assertFactory(createLabel, 'foo', expectedProps)
      })
      it('crates a Label from an object', () => {
        assertFactory(createLabel, { children: 'foo' }, expectedProps)
      })
      it('crates a Label from a Label element', () => {
        assertFactory(createLabel, <Label>foo</Label>, expectedProps)
      })
    })
  })
})
