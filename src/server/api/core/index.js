import express from 'express';

import beer from './beers';
import sessions from './sessions';
import user from './user';
import users from './users';

const router = express.Router();

router.use('/beers', beer);
router.use('/sessions', sessions);
router.use('/user', user);
router.use('/users', users);

export default router;
