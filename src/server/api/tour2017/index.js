import express from 'express';

import beers from './beers';
import sessions from './sessions';

const router = express.Router();

router.use('/beers', beers);
router.use('/sessions', sessions);

export default router;
