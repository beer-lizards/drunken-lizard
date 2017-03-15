import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import massive from 'massive';

import core from './core';
import { database } from '../config';
import tour2016 from './tour2016';
import tour2017 from './tour2017';

const connectionString = `postgres://${database.username}:${database.password}`
  + `@${database.host}:${database.port}/${database.name}`;

const massiveInstance = massive.connectSync({
  connectionString,
});

const app = express();

app.set('db', massiveInstance);

app.use(cors());
app.use(bodyParser.json());

app.use('/core', core);
app.use('/tour2016', tour2016);
app.use('/tour2017', tour2017);

export default app;
