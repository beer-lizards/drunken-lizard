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
      beer: PropTypes.string.isRequired,
      friends: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      settings: PropTypes.string.isRequired,
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
          onTouchTap={() => browserHistory.push('/')}
          primaryText={links.overview}
        />
        <MenuItem
          onTouchTap={() => browserHistory.push('/beer')}
          primaryText={links.beer}
        />
        <MenuItem
          onTouchTap={() => browserHistory.push('/friends')}
          primaryText={links.friends}
        />
        <MenuItem
          onTouchTap={() => browserHistory.push('/settings')}
          primaryText={links.settings}
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

