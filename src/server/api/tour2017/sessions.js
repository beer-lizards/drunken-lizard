import bunyan from 'bunyan';
import express from 'express';
import moment from 'moment';
import Promise from 'bluebird';

import * as tour2017Client from '../common/tour2017Client';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

const storeCredentials = (req, res) => {
  log.info('tour2017 - sessions - POST');
  const {
    email,
    password,
  } = req.body;
  return tour2017Client.verifyCredentials({
    email,
    password,
  })
  .then((verifiedCredentials) => {
    return new Promise((resolve) => {
      const { userId } = req.params;
      const db = req.app.get('db');
      db.drunken_lizard.winking_lizard.save({
        user_account_id: userId,
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
  })
  .then((inserted) => {
    res.json(inserted);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

router.route('/:userId')
  .all((req, res, next) => {
    // Verify authorization.
    log.trace('verify - jwt');
    next();
  })
  .post(storeCredentials);

export default router;
