import URI from 'urijs';
import fetch from 'isomorphic-fetch';

function ensureServerUrl(serverUrl, input) {
  if (typeof input !== 'string') return input;
  if (URI(input).is('absolute')) return input;
  return URI(serverUrl + input).normalize().toString();
}

// Simple wrapper making isomorphic-fetch universal.
export default function createFetch(serverUrl) {
  return (input, init) => {
    const verifiedInput = ensureServerUrl(serverUrl, input);
    return fetch(verifiedInput, init);
  };
}
