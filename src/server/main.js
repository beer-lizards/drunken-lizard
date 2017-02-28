import bunyan from 'bunyan';
import express from 'express';
import api from './api';
import config from './config';
import errorHandler from './lib/errorHandler';
import frontend from './frontend';

const app = express();
const log = bunyan.createLogger({ name: 'lizard' });

const { port } = config;

app.use('/api/v1', api);
app.use(frontend);
app.use(errorHandler);

app.listen(port, () => {
  log.info(`Server started at http://localhost:${config.port}`);
});
