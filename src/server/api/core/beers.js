import bunyan from 'bunyan';
import express from 'express';
import Promise from 'bluebird';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

/**
 * Get beer from database
 */
router.route('/')
  .post((req, res) => {
    log.info('app - beer - list');
    return new Promise((resolve, reject) => {

    });
  });

export default router;
