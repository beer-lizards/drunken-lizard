import bunyan from 'bunyan';
import Promise from 'bluebird';
import moment from 'moment';

const log = bunyan.createLogger({ name: 'lizard' });

/**
 * Fetches the api credentials to use when authenticating with the winking
 * lizard api.
 */
export function fetchApiCredentials({
  db,
  userId,
}) {
  log.info('database - fetchApiCredentials - start');
  return new Promise((resolve, reject) => {
    db.drunken_lizard.winking_lizard.findOne({
      tour_year: 2017,
      user_account_id: userId,
    }, (err, credential) => {
      if (err || !credential) {
        log.info('database - fetchApiCredentials - error');
        return reject(err);
      }
      log.info('database - fetchApiCredentials - success');
      return resolve(credential.credentials);
    });
  });
}

/**
 * Fetches the beers for a tour.
 *
 * return A set of tour beer id's.
 */
export function fetchBeerIds({
  db,
  tourYear,
}) {
  log.info('database - fetchBeerIds - start');
  return new Promise((resolve, reject) => {
    db.drunken_lizard.beer.find({
      tour_year: tourYear,
    }, (err, beers) => {
      if (err) {
        log.info('database - fetchBeerIds - error');
        return reject(err);
      }
      const beerIds = [];
      beers.forEach((beer) => {
        beerIds.push(parseInt(beer.tour_item_id, 10));
      });
      log.info(`database - fetchBeerIds - success(${beerIds.length})`);
      return resolve(beerIds);
    });
  });
}

/**
 *
 */
export function fetchBeers({
  db,
  tourYear,
  userId,
}) {
  log.info('database - fetchBeers - start');
  return new Promise((resolve, reject) => {
    db.run('select b.beer_id as "beerId", b.name, b.description, '
      + '  case coalesce(cb.beer_id, -1) when -1 then false '
      + '    else true '
      + 'end as consumed '
      + 'from drunken_lizard.beer b left outer join drunken_lizard.consumed_beer cb '
      + 'on b.beer_id = cb.beer_id '
      + 'where (cb.user_account_id = $1 or cb.user_account_id is null) '
      + 'and b.tour_year = $2', [userId, tourYear], (err, results) => {
        if (err) {
          log.info('database - fetchBeers - error');
          return reject(err);
        }
        log.info(`database - fetchBeers - success(${results.length})`);
        return resolve(results);
      });
  });
}


/**
 * Fetches the beers a used has consumed.
 *
 * return A set of tour beer id's.
 */
export function fetchBeersConsumed({
  db,
  tourYear,
  userId,
}) {
  log.info('database - fetchBeersConsumed - start');
  return new Promise((resolve, reject) => {
    db.run('select b.tour_item_id from drunken_lizard.consumed_beer cb '
      + 'inner join drunken_lizard.beer b on cb.beer_id = b.beer_id '
      + 'where b.tour_year = $1 and cb.user_account_id = $2',
      [tourYear, userId],
      (err, results) => {
        if (err) {
          log.info('database - fetchBeersConsumed - error');
          return reject(err);
        }
        const consumedBeerIds = [];
        results.forEach((beer) => {
          consumedBeerIds.push(parseInt(beer.tour_item_id, 10));
        });
        log.info(`database - fetchBeersConsumed - success(${consumedBeerIds.length})`);
        return resolve(consumedBeerIds);
      });
  });
}

/**
 * Saves a single beer to the database.
 */
export function saveBeer({
  beer,
  db,
}) {
  log.info('database - saveBeer - start');
  return new Promise((resolve, reject) => {
    const tourNumber = Number.isInteger(beer.ItemName.substring(0, 3)) ?
      beer.ItemName.substring(0, 3) : -1;
    db.drunken_lizard.beer.save({
      description: beer.ItemDesc,
      name: beer.ItemName,
      tour_beer_number: tourNumber,
      tour_data: beer,
      tour_description: beer.ItemDesc,
      tour_item_id: beer.ItemID,
      tour_name: beer.ItemName,
      tour_year: '2017',
      created_dtm: moment().format(),
      last_modified_dtm: moment().format(),
      last_accessed_dtm: moment().format(),
    }, (err, inserted) => {
      if (err) {
        log.info('database - saveBeer - error');
        return reject(err);
      }
      log.info('database - saveBeer - success');
      return resolve({
        beerId: inserted.beer_id,
        itemId: inserted.tour_item_id,
      });
    });
  });
}

/**
 * Saves a list of beers to the database.
 */
export function saveBeers({
  beers,
  db,
}) {
  log.info('database - saveBeers - start');
  return Promise.map(beers,
    beer => saveBeer({
      beer,
      db,
    }), {
      concurrency: 5,
    })
    .then((records) => {
      log.info(`database - saveBeers - all executed - ${records.length}`);
      return {
        rows: records,
        inserted: records.reduce(prev => prev + 1, 0),
        total: records.length,
      };
    });
}

/**
 * Saves a single of consumed beer to the database.
 */
export function saveConsumedBeer({
  beerId,
  db,
  userId,
}) {
  log.info('database - saveConsumedBeer - start');
  return new Promise((resolve, reject) => {
    db.drunken_lizard.consumed_beer.save({
      beer_id: beerId,
      user_account_id: userId,
      tour_added_dtm: moment().format(),
      created_dtm: moment().format(),
      last_accessed_dtm: moment().format(),
    }, (err, inserted) => {
      if (err) {
        log.info('database - saveConsumedBeer - error');
        return reject(err);
      }
      log.info('database - saveConsumedBeer - success');
      return resolve({
        consumedBeerId: inserted.consumed_beer_id,
      });
    });
  });
}

/**
 * Saves a list of consumed beers to the database.
 */
export function saveConsumedBeers({
  beers,
  consumedBeers,
  db,
  userId,
}) {
  log.info('database - saveConsumedBeers - start');

  const beerIdMap = {};
  beers.forEach((beer) => {
    beerIdMap[beer.itemId] = beer.beerId;
  });

  return Promise.map(consumedBeers,
    (consumedBeer) => {
      const beerId = beerIdMap[consumedBeer.AccountPt];
      return saveConsumedBeer({
        beerId,
        db,
        userId,
      });
    }, {
      concurrency: 5,
    })
    .then((records) => {
      log.info(`database - saveConsumedBeers - all executed - ${records.length}`);
      return {
        rows: records,
        inserted: records.reduce(prev => prev + 1, 0),
        total: records.length,
      };
    });
}
