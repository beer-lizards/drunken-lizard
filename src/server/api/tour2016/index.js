import express from 'express';

import sessions from './sessions';

const router = express.Router();

router.use('/sessions', sessions);

export default router;
