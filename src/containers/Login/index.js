import React from 'react';
import PropTypes from 'prop-types';
// import IconButton from '@material-ui/core/IconButton';
// import MailIcon from '@material-ui/icons/Mail';
import { Button, Input, TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import './style.less';
import { signup, getUserInfo, signin } from 'actions/user';
import { loginRouters } from 'utils';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

@withRouter
@connect(
    state => ({
      userInfo: state.user.userInfo
    }),
    dispatch => ({
      signup: data => dispatch(signup(data)),
      signin: data => dispatch(signin(data)),
      getUserInfo: data => dispatch(getUserInfo(data))
    })
)

export default class Login extends React.Component {
  static propTypes = {

  }
  constructor(props) {
    super(props)
    this.tabMap = loginRouters
  }
  componentDidMount() {
    if (this.props.userInfo.userid) {
      // 已经登录，重定向回首页
      this.props.history.replace('/');
    }
  }
  state = {
    form: {
      username: '',
      password: '',
    },
    canSubmit: false,
  }
  rules = {
    username: {
      validator: value => /^[a-zA-Z0-9_\.]+@([a-zA-Z-]+\.?)+$/.test(value),
      message: '请输入正确的邮箱'
    },
    password: {
      validator: value => !!value,
      message: '密码不能为空'
    }
  }
  onSubmit = () => {
    const { username, password } = this.state.form;
    switch (this.props.location.pathname) {
      case '/signup':
        this.props.signup({
          mail: username,
          password
        }).then(() => {
          window.location.href = '/';
        });
        break;
      case '/signin':
        this.props.signin({
          mail: username,
          password
        }).then(() => {
          window.location.href = '/';
        });
        break;
      default:

    }
  }
  onInputChange = (type, event) => {
    const value = event.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [type]: value
      }
    }, () => {
      const { form: { username,  password }, canSubmit } = this.state;
      let canSubmitF = false;
      if (this.rules['username'].validator(username) && this.rules['password'].validator(password)) {
        canSubmitF = true;
      }
      if (canSubmitF !== canSubmit) {
        this.setState({
          canSubmit: canSubmitF
        });
      }
    });
  }
  onInputBlur = (type) => {
    let error = false;
    if (!this.rules[type].validator(this.state.form[type])) {
      error = true;
    }
    this.setState({
      [`${type}Error`]: error
    });
  }

  render() {
    const { username, password, usernameError, passwordError, canSubmit, tab } = this.state;
    return (
      <div>
        <div className='content'>
          <div className='input-wrapper'>
            <TextField
              required={true}
              error={usernameError}
              id='username-input'
              label='UserName'
              margin='normal'
              onChange={this.onInputChange.bind(this, 'username')}
              onBlur={this.onInputBlur.bind(this, 'username')}
              placeholder="请输入邮箱"
            />
            <TextField
              required={true}
              error={passwordError}
              id='password-input'
              label='Password'
              type='password'
              margin='normal'
              onChange={this.onInputChange.bind(this, 'password')}
              onBlur={this.onInputBlur.bind(this, 'password')}
              placeholder="请输入密码s"
            />
          </div>
          {canSubmit && <Button variant='contained' color='primary' className='submit-button' onClick={this.onSubmit}>
            确认
          </Button>}
        </div>
      </div>);
  }
}
