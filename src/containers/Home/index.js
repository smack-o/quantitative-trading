import React from 'react';
import Components from '@/components';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '@/redux/actions/counter';
import './style.less';
import Common from './common.js';

const { Loading } = Components;
import { Button, Input, TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { signout } from 'actions/user';

@withRouter
@connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  dispatch => ({
    signout: data => dispatch(signout(data)),
  })
)

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    onLogout = () => {
      this.props.signout();
    }
    render() {
        return (
          <div className='home-wrapper'>
            
          </div>
        );
    }
}
