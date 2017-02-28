import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ip from 'ip';
import path from 'path';
import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import constants from './constants';
import webpackIsomorphicAssets from './assets';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);

// cheap-module-eval-source-map, because we want original source, but we don't
// care about columns, which makes this devtool faster than eval-source-map.
// http://webpack.github.io/docs/configuration.html#devtool
const devtools = 'cheap-module-eval-source-map';

const loaders = {
  css: '',
  less: '!less-loader',
  scss: '!sass-loader',
  sass: '!sass-loader?indentedSyntax',
};

const serverIp = ip.address();

export default function makeConfig(isDevelopment) {
  function stylesLoaders() {
    return Object.keys(loaders).map((ext) => {
      const prefix = 'css-loader!postcss-loader';
      const extLoaders = prefix + loaders[ext];
      const loader = isDevelopment
        ? `style-loader!${extLoaders}`
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader,
        test: new RegExp(`\\.(${ext})$`),
      };
    });
  }

  const config = {
    hotPort: constants.HOT_RELOAD_PORT,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'browser/main'),
      ] : [
        path.join(constants.SRC_DIR, 'browser/main'),
      ],
    },
    module: {
      noParse: [
        // https://github.com/localForage/localForage/issues/617
        new RegExp('localforage.js'),
      ],
      loaders: [
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)$/,
        }, {
          loader: 'url-loader?limit=1',
          test: /favicon\.ico$/,
        }, {
          loader: 'url-loader?limit=100000',
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        }, {
          test: /\.jsx?$/,
          exclude: constants.NODE_MODULES_DIR,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            plugins: ['transform-runtime', 'add-module-exports'],
            presets: ['es2015', 'react', 'stage-1'],
            env: {
              development: {
                presets: ['react-hmre'],
              },
            },
          },
        },
      ].concat(stylesLoaders()),
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`,
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/assets/',
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_BROWSER: true, // Because webpack is used only for browser code.
            IS_REACT_NATIVE: false, // To strip off React Native code.
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            SERVER_URL: JSON.stringify(process.env.SERVER_URL || ''),
          },
        }),
      ];
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          webpackIsomorphicToolsPlugin.development(),
        );
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app-[hash].css', {
            allChunks: true,
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true, // eslint-disable-line camelcase
              warnings: false, // Because uglify reports irrelevant warnings.
            },
          }),
          webpackIsomorphicToolsPlugin,
        );
      }
      return plugins;
    })(),
    postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        'dtrace-provider': path.resolve(__dirname, 'empty-shim.js'),
        'safe-json-stringify': path.resolve(__dirname, 'empty-shim.js'),
        'source-map-support': path.resolve(__dirname, 'empty-shim.js'),
        fs: path.resolve(__dirname, 'empty-shim.js'),
        mv: path.resolve(__dirname, 'empty-shim.js'),
        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')),
      },
    },
  };

  return config;
}
