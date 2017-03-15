import express from 'express';

import auth from './auth';
import beer from './beer';

const router = express.Router();

router.use('/auth', auth);
router.use('/beer', beer);

export default router;
