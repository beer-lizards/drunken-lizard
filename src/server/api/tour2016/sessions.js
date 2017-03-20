import bunyan from 'bunyan';
import express from 'express';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

const storeCredentials = (req, res) => {
  log.info('tour2017 - sessions - POST');
  return new Promise((resolve, reject) => {

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
