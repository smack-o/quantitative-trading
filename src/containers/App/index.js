import React from 'react'
// import * as style from './style.css';
import Components from '@/components'
import Router from '@/router'
import { loginRouters } from '@/utils'
import 'assets/global.less'
import { connect } from 'react-redux';
import Header from '@/components/Header';
import { withRouter } from 'react-router-dom';
import './style.less'

@withRouter
@connect(
  state => ({
    userInfo: state.user.userInfo
  }),
)

export default class App extends React.Component {
  componentDidMount() {
    if (loginRouters.indexOf(this.props.location.pathname) < 0 && !this.props.userInfo.userid) {
      // 未登录，重定向登录页
      this.props.history.replace('/signup');
    }
  }
  render () {
    return (
      <div>
        <Header />
        <div className="body-wrapper">
          <Router />
        </div>
      </div>
    )
  }
}
