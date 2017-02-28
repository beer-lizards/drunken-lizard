require('babel-register');
require('babel-polyfill');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const polyfillLocales = require('./intl/polyfillLocales');
const rootDir = require('path').resolve(__dirname, '..', '..');
const config = require('./config');
const webpackIsomorphicAssets = require('../../webpack/assets');

if (!process.env.NODE_ENV) {
  throw new Error(
    'Environment variable NODE_ENV must be set to development or production.'
  );
}

polyfillLocales(global, config.locales);

global.Promise = require('../common/configureBluebird');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .server(rootDir, () => {
    require('./main');
  });
