import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import { Button, Input, TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { signout } from 'actions/user';
import { getStgs } from 'actions/strategy';

@withRouter
@connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  dispatch => ({
    getStgs: data => dispatch(getStgs(data)),
  })
)

class StrategyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {
      this.props.getStgs()
    }
    render() {
        return (
          <div className='home-wrapper'>
            222
          </div>
        );
    }
}

export default StrategyList
