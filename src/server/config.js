import nconf from 'nconf';
import metadata from '../../package.json';

const isProduction = process.env.NODE_ENV === 'production';

// Specifying an env delimiter allows you to override below config when shipping
// to production server.
nconf.env('__');

// Remember, never put production secrets in config. Use nconf.
const config = {
  appName: metadata.name,
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction,
  locales: ['en'],
  port: process.env.PORT || 8000,
  winkingLizard2017: {
    host: 'signin.viguest.com',
    port: 80,
    softwareId: 'bHeBWRKW7POR93PNxdfmx8SCNuTFz2aq',
  },
};

// Use above config as a default one. Multiple other providers are available
// like loading config from json and more. Check out nconf docs.
nconf.defaults(config);

export default nconf.get();
