import { IntlProvider } from 'react-intl';
import { persistStore } from 'redux-persist';
import { Provider as Redux } from 'react-redux';
import { Router } from 'react-router';
import localforage from 'localforage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { PropTypes } from 'react';

import createRoutes from '../createRoutesWithAuth';
import configureStorage from '../../common/configureStorage';
import LoadingPage from '../loading/LoadingPage';

// TODO: Find a way to only rehydrate once.
class AppProvider extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    const { store } = this.props;
    const config = configureStorage(
      'insight',
      localforage,
    );
    persistStore(store, config, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    const { history, store } = this.props;

    if (!this.state.rehydrated) {
      return (
        <MuiThemeProvider>
          <LoadingPage store={store} />
        </MuiThemeProvider>
      );
    }

    const routes = createRoutes(store.getState);

    return (
      <Redux store={store}>
        <IntlProvider
          defaultLocale="en"
          locale="en"
        >
          <MuiThemeProvider>
            <Router history={history}>
              {routes}
            </Router>
          </MuiThemeProvider>
        </IntlProvider>
      </Redux>
    );
  }
}

export default AppProvider;
