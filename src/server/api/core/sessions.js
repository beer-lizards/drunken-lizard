import bunyan from 'bunyan';
import express from 'express';
import Promise from 'bluebird';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

const createSession = (req, res) => {
  log.info('core - session - POST');
  return new Promise((resolve, reject) => {
    const db = req.app.get('db');
    db.drunken_lizard.user_account.find({}, (err, users) => {
      if (err) {
        return reject(err);
      }
      log.info(`users - ${users.length}`);
      return resolve(users);
    });
  }).then((users) => {
    res.json(users);
  });
};

router.route('/')
  .post(createSession);

export default router;
