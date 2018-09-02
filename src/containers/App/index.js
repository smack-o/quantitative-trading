import React from 'react'
// import * as style from './style.css';
import Components from '@/components'
import Router from '@/router'
import { isMobile } from '@/utils/uaParser'
import 'assets/global.less'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router />
      </div>
    )
  }
}
