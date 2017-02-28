import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from './Login';

const styles = {
  margin: '.25em auto',
  width: '600px',
};

const AuthPage = ({ location, msg }) => (
  <div style={styles}>
    <Helmet title={msg.title} />
    <Login location={location} />
  </div>
);

AuthPage.propTypes = {
  location: PropTypes.object,
  msg: PropTypes.object,
};

export default connect(state => ({
  msg: state.intl.msg.auth.login,
}))(AuthPage);
