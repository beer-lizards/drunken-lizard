import createFetch from './createFetch';
import validate from './validate';

const configureDeps = (initialState, platformDeps, serverUrl) => ({
  ...platformDeps,
  fetch: createFetch(serverUrl),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;
