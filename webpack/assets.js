import * as plugin from 'webpack-isomorphic-tools/plugin';

export default {
  assets: {
    images: {
      extensions: ['gif', 'jpg', 'png', 'ico'],
      parser: plugin.url_loader_parser,
    },
    fonts: {
      extensions: ['eot', 'ttf', 'woff', 'woff2'],
      parser: plugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: plugin.url_loader_parser,
    },
  },
};
