import bunyan from 'bunyan';
import crypto from 'crypto';
import express from 'express';
import moment from 'moment';
import Promise from 'bluebird';
import request from 'request';
import url from 'url';

import config from '../../config';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();
const { host, port } = config.winkingLizard2017;

const storeCredentials = (req, res) => {
  log.info('tour2017 - sessions - POST');
  return new Promise((resolve, reject) => {
    const {
      email,
      password,
    } = req.body;

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
      return res.json(validation);
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
    return request(opts, (error, response) => {
      if (!error && response.statusCode === 200) {
        return resolve({
          email,
          password,
        });
      }
      return reject('Invalid credentials.');
    });
  }).then((verifiedCredentials) => {
    return new Promise((resolve) => {
      const { id } = req.params;
      const db = req.app.get('db');
      db.drunken_lizard.winking_lizard.save({
        user_account_id: id,
        tour_year: 2017,
        credentials: verifiedCredentials,
        password_rotation: false,
        created_dtm: moment().format(),
        last_modified_dtm: moment().format(),
        last_accessed_dtm: moment().format(),
      }, (err, inserted) => {
        if (err) {
          throw err;
        }
        log.info(`tour2017 - credentials - ${JSON.stringify(inserted)}`);
        resolve(inserted);
      });
    });
  }).then((inserted) => {
    res.json(inserted);
  }).catch((err) => {
    res.status(400).json(err);
  });
};

router.route('/:id')
  .all((req, res, next) => {
    // Verify authorization.
    log.trace('verify - jwt');
    next();
  })
  .post(storeCredentials);

export default router;
