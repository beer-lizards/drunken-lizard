import AppBar from 'material-ui/AppBar';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { openDrawer } from '../../common/app/actions';

const Header = ({ dispatch, title }) => (
  <AppBar
    title={title}
    onLeftIconButtonTouchTap={() => dispatch(openDrawer())}
  />
);

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(state => ({
  title: state.intl.msg.app.title,
}))(Header);
