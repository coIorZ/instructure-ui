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

import React from 'react'
import { expect, mount, stub } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/components/View'

import Rating from '../index'
import RatingLocator from '../locator'

describe('<Rating />', async () => {
  it('should render the correct number of icons', async () => {
    await mount(<Rating label="Course rating" iconCount={5} />)
    const icons = await RatingLocator.findAll('svg')
    expect(icons.length).to.equal(5)
  })

  it('should handle a valueMax of zero', async () => {
    await mount(<Rating label="Course rating" valueMax={0} />)
    const icons = await RatingLocator.findAll('svg')
    expect(icons.length).to.equal(3)
  })

  it('should fill the correct number of icons', async () => {
    await mount(
      <Rating
        label="Course rating"
        iconCount={5}
        valueNow={89}
        valueMax={100}
      />
    )

    const rating = await RatingLocator.find()
    const filledIcons = await rating.findAllFilledIcons()

    expect(filledIcons.length).to.equal(4)
  })

  it('never renders more than `iconCount` icons', async () => {
    await mount(
      <Rating
        label="Course rating"
        iconCount={5}
        valueNow={110}
        valueMax={100}
      />
    )

    const icons = await RatingLocator.findAll('svg')
    expect(icons.length).to.equal(5)
  })

  it('should set the required aria attribute values', async () => {
    await mount(
      <Rating
        label="Course rating"
        iconCount={5}
        valueNow={89}
        valueMax={100}
        formatValueText={(current, max) => `${current} out of ${max}`}
      />
    )

    const rating = await RatingLocator.find()

    // see https://www.w3.org/TR/wai-aria-1.1/#slider
    expect(rating.getAttribute('role')).to.equal('slider')
    expect(rating.getAttribute('aria-readonly')).to.equal('true')
    expect(rating.getAttribute('aria-label')).to.equal('Course rating')
    expect(rating.getAttribute('aria-valuenow')).to.equal('4')
    expect(rating.getAttribute('aria-valuemax')).to.equal('5')
    expect(rating.getAttribute('aria-valuemin')).to.equal('0')
    expect(rating.getAttribute('aria-valuetext')).to.equal('4 out of 5')
  })

  it('should meet a11y standards', async () => {
    await mount(<Rating label="Course rating" iconCount={5} />)
    const rating = await RatingLocator.find()
    expect(await rating.accessible()).to.be.true()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small'
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const warning = `Warning: [Rating] prop '${prop}' is not allowed.`
            const props = {
              [prop]: 'foo'
            }
            await mount(
              <Rating
                label="Course rating"
                iconCount={5}
                {...props}
              />
            )
            expect(consoleError)
              .to.be.calledWithExactly(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')
            await mount(
              <Rating
                label="Course rating"
                iconCount={5}
                {...props}
              />
            )
            expect(consoleError).to.not.be.called()
          })
        }
    })
  })
})
