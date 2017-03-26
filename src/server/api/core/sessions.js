import bunyan from 'bunyan';
import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

import { secret } from '../../config';

import * as database from '../common/database';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

/**
 *
 */
const createSession = (req, res) => {
  log.info('core - session - POST');

  const db = req.app.get('db');

  const {
    email,
    password,
  } = req.body;

  return database.fetchUser({
    db,
    email,
  })
  .then((user) => {
    log.info(JSON.stringify(user));

    // Verify credential.
    const hash = crypto.createHash(user.algorithm);
    hash.update(`${user.salt}:${password}`);

    const passwordHash = hash.digest('hex');
    const authenticated = user.password === passwordHash;
    log.info(`${user.email} authenticated ${authenticated}`);

    return {
      authenticated,
      email: user.email,
    };
  })
  .then((response) => {
    const token = jwt.sign(response, secret);

    res.header('Authorization', `Bearer ${token}`).json(response);
  });
};

router.route('/')
  .post(createSession);

export default router;
