import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { connect } from 'react-redux';
import { grey200 } from 'material-ui/styles/colors';

import Drawer from './Drawer';
import Footer from './Footer';
import Header from './Header';
import {
  onAppComponentDidMount,
  opAppRehydrate,
} from '../../common/app/actions';

const styles = {
  div: {
    backgroundColor: `${grey200}`,
    minHeight: '800px',
  },
};

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]).isRequired,
    dispatch: PropTypes.func.isRequired,
    msg: PropTypes.shape({
      app: PropTypes.shape({
        description: PropTypes.string.isRequired,
        titleTemplate: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(opAppRehydrate());
  }

  // Note pattern how actions related to app start are dispatched.
  // componentDidMount is not called in ReactDOMServer.renderToString, so it's
  // the right place to dispatch client only actions.
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(onAppComponentDidMount());
  }

  render() {
    const { children, msg } = this.props;

    return (
      <div>
        <Helmet
          link={[
            { rel: 'shortcut icon', href: require('./favicon.ico') },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: 'stylesheet', href: '/libs/c3/c3.min.css' },
          ]}
          meta={[{
            name: 'description',
            content: msg.app.description,
          }]}
          script={[
            { src: '/libs/c3/c3.min.js', type: 'text/javascript' },
            { src: '/libs/d3/d3.min.js', type: 'text/javascript' },
          ]}
          titleTemplate={msg.app.titleTemplate}
        />
        <Header />
        <Drawer />
        <div style={styles.div}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }

}

// Just inject dispatch.
export default connect(state => ({
  msg: {
    app: state.intl.msg.app,
  },
}))(withWidth()(App));
