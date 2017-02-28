import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import auth from './auth';
import beer from './beer';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/beer', beer);

export default app;
