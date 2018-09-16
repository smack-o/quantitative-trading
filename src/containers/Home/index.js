import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import { Route, Switch, Redirect } from 'react-router-dom'
import StrategyList from './_components/StrategyList'
import StrategySetting from './_components/StrategySetting'
import StrategyHelp from './_components/StrategyHelp'
// import { Button, Input, TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { signout } from 'actions/user';
import { udpateHeaderTabs } from 'actions/header'

@withRouter
@connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  dispatch => ({
    signout: data => dispatch(signout(data)),
    udpateHeaderTabs: data => dispatch(udpateHeaderTabs(data)),
  })
)

class Home extends React.Component {
    constructor(props) {
      super(props);
    }
    tabs = [{
      pathname: '/stgs',
      label: '我的策略'
    }, {
      pathname: '/stgs/setting',
      label: '个人设置'
    }, {
      pathname: '/stgs/help',
      label: '帮助'
    }]
    componentDidMount() {
      this.props.udpateHeaderTabs(this.tabs)
    }
    render() {
        return (
          <Switch>
            <Route path='/stgs' component={StrategyList} />
            <Route path='/stgs/setting' component={StrategySetting} />
            <Route path='/stgs/help' component={StrategyHelp} />
          </Switch>
        );
    }
}

export default Home
