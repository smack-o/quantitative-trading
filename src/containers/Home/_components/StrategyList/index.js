import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import { Button, Input, TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { signout } from 'actions/user';
import { getStgs, createStgs } from 'actions/strategy';

@withRouter
@connect(
  state => ({
    stgs: state.strategy.stgs
  }),
  dispatch => ({
    getStgs: data => dispatch(getStgs(data)),
    createStgs: data => dispatch(createStgs(data)),
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
    createStg = () => {
      this.props.createStgs()
    }
    render() {
      let stgs = null;
      if (this.props.stgs.length === 0) {
        stgs = <div>暂无策略</div>
      }
      return (<div>
        <div className='bottom-bar'>
          <Button onClick={this.createStg} variant='contained' color='primary' className='user-logout'>新建策略</Button>
        </div>
      </div>)
    }
}

export default StrategyList
