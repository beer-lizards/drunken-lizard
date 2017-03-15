import bunyan from 'bunyan';
import express from 'express';
import Promise from 'bluebird';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

router.route('/')
  .post((req, res) => {
    log.info('app - beer - list');
    // Get beer from database
  });

export default router;
