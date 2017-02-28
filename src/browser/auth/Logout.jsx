// Libraries
import React from 'react';
import { connect } from 'react-redux';

import * as authActions from '../../common/auth/actions';

class Logout extends React.Component {

  static propTypes = {
    logout: React.PropTypes.func.isRequired,
    msg: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout } = this.props;
    // Redirect user to root page before logout since logout recycles app state.
    this.context.router.replace('/');
    logout();
  }

  render() {
    const { msg } = this.props;

    return (
      <div className="logout">
        <button onClick={this.logout}>{msg.button}</button>
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.auth.logout,
}), authActions)(Logout);
