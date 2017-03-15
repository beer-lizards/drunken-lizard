import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: 'lizard' });

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login(fields) {
  log.trace(`auth - login ${fields}`);
  return ({ fetch, validate }) => {
    async function getPromise() {
      try {
        // await validate(fields)
        //   .prop('email').required().email()
        //   .prop('password').required().simplePassword()
        //   .promise;

        // Sure we can use smarter api than raw fetch.
        const response = await fetch('/api/app/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
        if (response.status !== 200) throw response;

        // Return JSON response.
        return response.json();
      } catch (error) {
        // Here we can transform error statuses to custom errors.
        if (error.status === 401) {
          throw validate.wrongPassword('password');
        }
        throw error;
      }
    }

    return {
      type: 'LOGIN',
      payload: {
        promise: getPromise(),
      },
    };
  };
}

export function signup(fields) {
  log.trace(`auth - signup ${fields}`);
  return ({ fetch }) => {
    return {
      type: 'SIGNUP',
      payload: {
        promise: fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        }).then((response, err) => {
          if (err) {
            return err;
          }
          return response.json();
        }),
      },
    };
  };
}

export function logout() {
  return () => ({
    type: LOGOUT,
  });
}
