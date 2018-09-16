import React from 'react'
import { Button, Input, TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { loginRouters } from 'utils';
import { withRouter } from 'react-router-dom';
import './style.less';
import { signout } from 'actions/user';
import { connect } from 'react-redux';

@withRouter
@connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  dispatch => ({
    signout: data => dispatch(signout(data)),
  })
)

export default class Header extends React.Component {
  state = {
    tab: 'signup'
  }

  constructor(props) {
    super(props)
    this.tabMap = loginRouters
  }
  // login page router map
  // tabMap = ['/signup', '/signin', '/reset']
  componentReceiveProps(props) {
    console.log(props)
  }
  // login page header
  getLoginPageHeader = (pathname) => {
    console.log(pathname)
    return (
      <AppBar className='header'>
        <Tabs value={this.tabMap.indexOf(pathname)} onChange={this.onTabChange}>
          <Tab label='注册' />
          <Tab label='登录' />
          <Tab label='找回密码' />
        </Tabs>
      </AppBar>
    )
  }
  onTabChange = (e, value) => {
    this.props.history.push(this.tabMap[value]);
  }
  onLogout = async () => {
    await this.props.signout();
    this.props.history.push('signup');
  }
  render () {
    const pathname = this.props.location.pathname;
    if (this.tabMap.indexOf(pathname) >= 0) {
      // login page
      return this.getLoginPageHeader(pathname);
    }
    const { tab } = this.state;
    return (
      <AppBar className='header'>
        {/* <Tabs value={0}>
          <Tab label='首页' />
        </Tabs> */}
        <div className='user-info'>
          <Button onClick={this.onLogout} variant='contained' color='primary' className='user-logout'>登出</Button>
        </div>
      </AppBar>
    )
  }
}
