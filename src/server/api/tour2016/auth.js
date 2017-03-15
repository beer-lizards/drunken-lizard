import bunyan from 'bunyan';
import express from 'express';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

router.route('/login')
  .post((req, res) => {
    log.info('tour2016 - auth - login');

    // Verify user against database.
  });

export default router;
