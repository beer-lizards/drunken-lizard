import React, { PropTypes } from 'react';

export default function fetch(...actions) {
  return Wrapped => class Fetch extends React.Component {

    static contextTypes = {
      store: React.PropTypes.object, // Redux store.
    };

    // Passed via react-router or can be passed manually in React Native.
    static propTypes = {
      location: PropTypes.object,
      params: PropTypes.object,
      token: PropTypes.string,
    };

    // For server side fetching. Check frontend/render.js
    static fetchActions = actions;

    // For client side fetching.
    componentDidMount() {
      const { store: { dispatch } } = this.context;
      const { location, params } = this.props;
      const token = !this.props.token ? null : this.props.token;
      actions.forEach(action => dispatch(action({ location, params, token })));
    }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}
