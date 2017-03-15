import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';

import SignUp from './SignUp';

const styles = {
  margin: '.25em auto',
  width: '600px',
};

const SignUpPage = ({ location, msg }) => (
  <div style={styles}>
    <Helmet title={msg.title} />
    <SignUp location={location} />
  </div>
);

SignUpPage.propTypes = {
  location: PropTypes.object,
  msg: PropTypes.object,
};

export default connect(state => ({
  msg: state.intl.msg.signup,
}))(SignUpPage);
