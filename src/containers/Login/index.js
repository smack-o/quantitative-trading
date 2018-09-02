import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
// import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function SimpleBadge(props) {
  return (
    <div>
      <AppBar position='static'>
        <Tabs value={0}>
          <Tab label='注册' />
          <Tab label='登录' />
          <Tab label='找回密码' />
        </Tabs>
      </AppBar>
    </div>
  );
}

SimpleBadge.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default SimpleBadge;
