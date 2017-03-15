import bunyan from 'bunyan';
import crypto from 'crypto';
import express from 'express';
import moment from 'moment';
import Promise from 'bluebird';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

const createUser = (req, res) => {
  log.info('core - users - POST');
  return new Promise((resolve, reject) => {
    const {
      email,
      password,
      username,
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

    if (!username) {
      validation.fields.push('username');
    }

    if (validation.fields.length > 0) {
      return res.json(validation);
    }

    const salt = crypto.randomBytes(48).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(`${salt}:${password}`);

    const db = req.app.get('db');
    return db.drunken_lizard.user_account.save({
      username,
      email,
      password: hash.toString('hex'),
      algorithm: 'sha256',
      salt,
      disabled: false,
      created_dtm: moment().format(),
      last_modified_dtm: moment().format(),
      last_accessed_dtm: moment().format(),
    }, (err, inserted) => {
      if (err) {
        return reject(err);
      }
      log.info(`create user - ${inserted}`);
      return resolve(inserted);
    });
  }).then((inserted) => {
    res.json({
      inserted,
    });
  });
};

router.route('/')
  .post(createUser);

export default router;
