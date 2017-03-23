import bunyan from 'bunyan';
import express from 'express';
import Promise from 'bluebird';

import * as tour2017Client from '../common/tour2017Client';
import * as database from '../common/database';

const log = bunyan.createLogger({ name: 'lizard' });

const router = express.Router();

/**
 *
 */
const storeBeers = ({
  beers,
  db,
  userId,
}) => {
  log.info('tour2017 - storeBeers - start');
  return database.fetchBeerIds({
    db,
    tourYear: 2017,
  })
  .then(beerIds =>
    database.fetchBeersConsumed({
      db,
      tourYear: 2017,
      userId,
    })
    .then((consumedBeerIds) => {
      log.info('tour2017 - storeBeers - aggregation');
      return {
        beerIds,
        consumedBeerIds,
      };
    }))
  .then(({ beerIds, consumedBeerIds }) => {
    log.info('tour2017 - storeBeers - insert');
    return new Promise((resolve) => {
      const beerIdsSet = new Set();
      beerIds.forEach(beer => beerIdsSet.add(beer));

      const beerList = beers[1];
      const newBeers = [];
      beerList.forEach((beer) => {
        if (!beerIdsSet.has(beer.ItemID)) {
          newBeers.push(beer);
        }
      });

      log.info(`existing beers - ${beerIdsSet.size}`);
      log.info(`new beers - ${newBeers.length}`);

      const consumedBeerIdsSet = new Set(consumedBeerIds);
      consumedBeerIds.forEach(beer => consumedBeerIdsSet.add(beer));

      const consumedBeers = beers[0];
      const newConsumedBeers = [];
      consumedBeers.forEach((consumedBeer) => {
        if (!consumedBeerIdsSet.has(consumedBeer.AccountPt)) {
          newConsumedBeers.push(consumedBeer);
        }
      });

      log.info(`existing consumed - ${consumedBeerIdsSet.size}`);
      log.info(`new consumed - ${newConsumedBeers.length}`);

      database.saveBeers({
        beers: newBeers,
        db,
      })
      .then((beerResults) => {
        return database.saveConsumedBeers({
          beers: beerResults.rows,
          consumedBeers: newConsumedBeers,
          db,
          userId,
        })
        .then((consumedBeerResults) => {
          resolve({
            beerConsumedInserted: consumedBeerResults.inserted,
            beerInserted: beerResults.inserted,
          });
        });
      });
    });
  });
};

const cardHistory = (req, res) => {
  log.info('tour2017 - cardHistory - start');
  database.fetchApiCredentials({
    db: req.app.get('db'),
    userId: req.params.userId,
  })
  .then(credentials => tour2017Client.fetchCardHistory(credentials))
  .then((beers) => {
    log.info('tour2017 - cardHistory - success');
    res.json(beers);
  })
  .catch((err) => {
    log.info('tour2017 - cardHistory - err');
    res.status(400).json(err);
  });
};

/**
 *
 */
const listBeers = (req, res) => {
  log.info('tour2017 - listBeers - start');
  database.fetchBeers({
    db: req.app.get('db'),
    tourYear: 2017,
    userId: req.params.userId,
  })
  .then((beers) => {
    log.info('tour2017 - listBeers - success');
    res.json(beers);
  })
  .catch((err) => {
    log.info('tour2017 - listBeers - err');
    res.status(400).json(err);
  });
};

/**
 * Synchronize beers with wiking lizard 2017 webapp and local database.
 */
const synchBeers = (req, res) => {
  log.info('tour2017 - synchBeers - start');
  database.fetchApiCredentials({
    db: req.app.get('db'),
    userId: req.params.userId,
  })
  .then(credentials => tour2017Client.fetchBeerHistory(credentials))
  .then(beers => storeBeers({
    beers,
    db: req.app.get('db'),
    userId: req.params.userId,
  }))
  .then((updated) => {
    log.info('tour2017 - synchBeers - success');
    res.json(updated);
  })
  .catch((err) => {
    log.info('tour2017 - synchBeers - err');
    res.status(400).json(err);
  });
};

router.route('/:userId/card')
  .all((req, res, next) => {
    // Verify authorization.
    log.trace('verify - jwt');
    next();
  })
  .get(cardHistory);

router.route('/:userId')
  .all((req, res, next) => {
    // Verify authorization.
    log.trace('verify - jwt');
    next();
  })
  .get(listBeers);

router.route('/sync/:userId')
  .all((req, res, next) => {
    // Verify authorization.
    log.trace('verify - jwt');
    next();
  })
  .patch(synchBeers);


export default router;
