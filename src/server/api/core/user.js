import bunyan from 'bunyan';
import express from 'express';
import Promise from 'bluebird';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

const fetchUser = (req, res) => {
  log.info('core - users - fetch');
  const db = req.app.get('db');
  return new Promise((resolve, reject) => {
    db.drunken_lizard.user_account.find({
      user_account_id: req.params.id,
    }, (err, user) => {
      if (err) {
        return reject(err);
      }
      log.info(`user - ${user.length}`);
      return resolve(user);
    });
  }).then((user) => {
    res.json(user);
  });
};

router.route('/:id')
  .all((req, res, next) => {
    // Verify authorization.
    log.trace('verify - jwt');
    next();
  })
  .get(fetchUser);

export default router;
