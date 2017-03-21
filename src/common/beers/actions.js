import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: 'lizard' });

export const FETCH_BEERS_ERROR = 'FETCH_BEERS_ERROR';
export const FETCH_BEERS_START = 'FETCH_BEERS_START';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';

export function fetchBeers() {
  log.info('actions - beers');
  return ({ fetch }) => ({
    type: 'FETCH_BEERS',
    payload: {
      promise: fetch('/api/tour2017/beers/1', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error('Failed to fetch beers.');
      }),
    },
  });
}
