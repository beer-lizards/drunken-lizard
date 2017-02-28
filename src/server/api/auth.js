import bunyan from 'bunyan';
import express from 'express';
import md5 from 'md5';
import request from 'request';
import url from 'url';

import config from '../config';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();
const { host, port } = config.winkingLizard2017;

router.route('/login')
  .post((req, res) => {
    log.info('auth - login');
    const path = url.format({
      protocol: 'http',
      hostname: host,
      port,
      pathname: '_110/VIGuestSignUp/CFGet/VIGuestAccounts.cfc',
      query: {
        method: 'VIGLoginVerification',
        UserID: req.body.email,
        Password: md5(req.body.password),
      },
    });

    const opts = {
      method: 'GET',
      url: path,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    request(opts, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let json;
        try {
          json = JSON.parse(body);
          log.info(body);
          json.token = response.headers.authorization;
        } catch (ex) {
          log.error(ex);
          return res.status(500).end();
        }
        return res.status(200).send(json).end();
      }
      log.error(error);
      return res.status(500).end();
    });
  });

export default router;
