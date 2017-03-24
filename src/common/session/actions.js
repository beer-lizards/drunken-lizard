import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: 'lizard' });

export const SESSION_ERROR = 'SESSION_ERROR';
export const SESSION_START = 'SESSION_START';
export const SESSION_SUCCESS = 'SESSION_SUCCESS';

/**
 * Create a new authenticated session.
 */
export function authenticate() {
  log.info('actions - authenticate');
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
