import bunyan from 'bunyan';
import crypto from 'crypto';
import Promise from 'bluebird';
import request from 'request';
import url from 'url';

import config from '../../config';

const log = bunyan.createLogger({ name: 'lizard' });
const { host, port, softwareId, vigId } = config.winkingLizard2017;

/**
 * Fetches the current beer list and consumed beers from the api.
 */
export function fetchBeerHistory({
  email,
  password,
}) {
  log.info('tour2017 - fetchBeerHistory - start');
  return new Promise((resolve, reject) => {
    const validation = {
      fields: [],
    };
    if (!email) {
      validation.fields.push('email');
    }

    if (!password) {
      validation.fields.push('password');
    }

    if (validation.fields.length > 0) {
      return reject(validation);
    }

    // Verify credential.
    const hash = crypto.createHash('md5');
    hash.update(`${password}`);

    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/VIGuestAccounts.cfc',
      query: {
        method: 'VIGItemHistory',
        UserID: email,
        Password: hash.digest('hex'),
        SoftwareID: softwareId,
        StoreSerial: 80216,
        StoreID: 5420,
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return request(opts, (err, response, body) => {
      if (err || response.statusCode < 200 || response.statusCode > 300) {
        log.info('tour2017 - fetchBeerHistory - err');
        return reject(err);
      }
      log.info('tour2017 - fetchBeerHistory - success');
      return resolve(JSON.parse(body));
    });
  });
}

/**
 * Fetches the current card history.
 */
export function fetchCardHistory({
  email,
  password,
}) {
  log.info('tour2017 - fetchCardHistory - start');
  return new Promise((resolve, reject) => {
    const validation = {
      fields: [],
    };
    if (!email) {
      validation.fields.push('email');
    }

    if (!password) {
      validation.fields.push('password');
    }

    if (validation.fields.length > 0) {
      return reject(validation);
    }

    // Verify credential.
    const hash = crypto.createHash('md5');
    hash.update(`${password}`);

    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/VIGuestAccounts.cfc',
      query: {
        method: 'VIGCardHistory',
        UserID: email,
        Password: hash.digest('hex'),
        SoftwareID: softwareId,
        StoreSerial: 80216,
        StoreID: 5420,
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return request(opts, (err, response, body) => {
      if (err || response.statusCode < 200 || response.statusCode > 300) {
        log.info('tour2017 - fetchCardHistory - err');
        return reject({
          message: 'Invalid credentials.',
        });
      }
      log.info('tour2017 - fetchCardHistory - success');
      return resolve(JSON.parse(body));
    });
  });
}

/**
 * Fetches a users gift history.
 */
export function fetchGiftHistory({
  email,
  password,
}) {
  log.info('tour2017 - fetchGiftHistory - start');
  return new Promise((resolve, reject) => {
    const validation = {
      fields: [],
    };
    if (!email) {
      validation.fields.push('email');
    }

    if (!password) {
      validation.fields.push('password');
    }

    if (validation.fields.length > 0) {
      return reject(validation);
    }

    // Verify credential.
    const hash = crypto.createHash('md5');
    hash.update(`${password}`);

    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/VIGuestAccounts.cfc',
      query: {
        method: 'GetAvailableVoucher',
        UserID: email,
        Password: hash.digest('hex'),
        SoftwareID: softwareId,
        StoreSerial: 80216,
        StoreID: 5420,
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return request(opts, (err, response, body) => {
      if (err || response.statusCode < 200 || response.statusCode > 300) {
        log.info('tour2017 - fetchGiftHistory - err');
        return reject({
          message: 'Invalid credentials.',
        });
      }
      log.info('tour2017 - fetchGiftHistory - success');
      return resolve(JSON.parse(body));
    });
  });
}

/**
 * Fetch the different locations.
 */
export function fetchLocation({
  email,
  password,
}) {
  log.info('tour2017 - fetchLocation - start');
  return new Promise((resolve, reject) => {
    const validation = {
      fields: [],
    };
    if (!email) {
      validation.fields.push('email');
    }

    if (!password) {
      validation.fields.push('password');
    }

    if (validation.fields.length > 0) {
      return reject(validation);
    }

    // Verify credential.
    const hash = crypto.createHash('md5');
    hash.update(`${password}`);

    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/GetAllGuestLocations.cfc',
      query: {
        method: 'GetVIGuest',
        UserID: email,
        Password: hash.digest('hex'),
        SoftwareID: softwareId,
        VIGID: vigId,
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return request(opts, (err, response, body) => {
      if (err || response.statusCode < 200 || response.statusCode > 300) {
        log.info('tour2017 - fetchLocation - err');
        return reject({
          message: 'Invalid credentials.',
        });
      }
      log.info('tour2017 - fetchLocation - success');
      return resolve(JSON.parse(body));
    });
  });
}

/**
 * Fetch the user details.
 */
export function fetchUser({
  email,
  password,
}) {
  log.info('tour2017 - fetchUser - start');
  return new Promise((resolve, reject) => {
    const validation = {
      fields: [],
    };
    if (!email) {
      validation.fields.push('email');
    }

    if (!password) {
      validation.fields.push('password');
    }

    if (validation.fields.length > 0) {
      return reject(validation);
    }

    // Verify credential.
    const hash = crypto.createHash('md5');
    hash.update(`${password}`);

    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/VIGuestAccounts.cfc',
      query: {
        method: 'GetVIGuest',
        UserID: email,
        Password: hash.digest('hex'),
        SoftwareID: softwareId,
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return request(opts, (err, response, body) => {
      if (err || response.statusCode < 200 || response.statusCode > 300) {
        log.info('tour2017 - fetchUser - err');
        return reject({
          message: 'Invalid credentials.',
        });
      }
      log.info('tour2017 - fetchUser - success');
      return resolve(JSON.parse(body));
    });
  });
}

/**
 * Verifies the users credential.
 */
export function verifyCredentials({
  email,
  password,
}) {
  log.info('tour2017 - authenticatePromise - start');
  return new Promise((resolve, reject) => {
    const validation = {
      fields: [],
    };
    if (!email) {
      validation.fields.push('email');
    }

    if (!password) {
      validation.fields.push('password');
    }

    if (validation.fields.length > 0) {
      return reject(validation);
    }

    // Verify credential.
    const hash = crypto.createHash('md5');
    hash.update(`${password}`);

    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/VIGuestAccounts.cfc',
      query: {
        method: 'VIGLoginVerification',
        UserID: email,
        Password: hash.digest('hex'),
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return request(opts, (err, response) => {
      if (err || response.statusCode < 200 || response.statusCode > 300) {
        log.info('tour2017 - authenticatePromise - err');
        return reject({
          message: 'Invalid credentials.',
        });
      }
      log.info('tour2017 - authenticatePromise - success');
      return resolve({
        email,
        password,
      });
    });
  });
}
