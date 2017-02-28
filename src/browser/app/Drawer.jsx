import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { openDrawer, closeDrawer } from '../../common/app/actions';

class DrawerWrapper extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    links: PropTypes.shape({
      dashboard: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
      home: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    viewer: PropTypes.object,
  };

  toggleDrawer() {
    const { dispatch, drawerOpen } = this.props;
    if (drawerOpen) {
      return dispatch(closeDrawer());
    }
    return dispatch(openDrawer());
  }

  render() {
    const { drawerOpen, links, title, viewer } = this.props;

    if (!viewer) {
      return (
        <div />
      );
    }

    return (
      <Drawer
        open={drawerOpen}
        onRequestChange={() => this.toggleDrawer()}
        docked={false}
      >
        <MenuItem
          leftIcon={
            <FontIcon
              className="material-icons"
              style={{ color: '#559' }}
            >
              assessment
            </FontIcon>
          }
          onTouchTap={() => browserHistory.push('/dashboard')}
          primaryText="Dashboard"
        />
        <MenuItem
          leftIcon={
            <FontIcon
              className="material-icons"
              style={{ color: '#559' }}
            >
              devices
            </FontIcon>
          }
          onTouchTap={() => browserHistory.push('/endpoint')}
          primaryText="Endpoints"
        />
      </Drawer>
    );
  }
}

DrawerWrapper.defaultProps = {
  viewer: null,
};

export default connect(state => ({
  drawerOpen: state.app.drawerOpen,
  links: state.intl.msg.app.links,
  title: state.intl.msg.app.title,
  viewer: state.users.viewer,
}))(DrawerWrapper);

