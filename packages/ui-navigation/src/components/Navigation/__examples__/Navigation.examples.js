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
import NavigationItem from '../NavigationItem'
import IconAdmin from '@instructure/ui-icons/lib/Line/IconAdmin'
import IconDashboard from '@instructure/ui-icons/lib/Line/IconDashboard'
import IconAssignment from '@instructure/ui-icons/lib/Line/IconAssignment'
import IconAnnouncement from '@instructure/ui-icons/lib/Line/IconAnnouncement'

export default {
  permutations: [
    'defaultMinimized'
  ],
  renderProps: (props) => {
    return {
      componentProps: {
        label: "I'm the main nav",
        toggleLabel: {
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation',
        },
        children: [
          <NavigationItem
            key="1"
            icon={<IconAdmin />}
            label="Admin"
            href="#"
            theme={{
              backgroundColor: 'red',
              hoverBackgroundColor: 'blue'
            }}
          />,
          <NavigationItem
            key="2"
            icon={<IconDashboard />}
            label="Dashboard"
            href="#"
            selected={true}
          />,
          <NavigationItem
            key="3"
            icon={<IconAssignment />}
            label="Courses"
            href="#"
          />,
          <NavigationItem
            key="4"
            icon={<IconAnnouncement />}
            label="Supercalifragilistic"
            href="#"
          />
        ]
      },
      exampleProps: {
        style: {
          width: '5.25rem',
          height: '30rem'
        }
      }
    }
  },
  /* eslint-disable react/display-name */
  renderExample: (Component, componentProps, exampleProps, key) => {
    return <div key={key} {...exampleProps}><Component {...componentProps} /></div>
  }
}
