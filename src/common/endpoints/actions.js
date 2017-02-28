export const ENDPOINTS_DELETE_REQUESTED = 'ENDPOINTS_DELETE_REQUESTED';
export const ENDPOINTS_ON_EXPAND = 'ENDPOINTS_ON_EXPAND';
export const ENDPOINTS_ON_NEXT_PAGE = 'ENDPOINTS_ON_NEXT_PAGE';
export const ENDPOINTS_ON_PREVIOUS_PAGE = 'ENDPOINTS_ON_PREVIOUS_PAGE';
export const ENDPOINTS_SELECTED = 'ENDPOINTS_SELECTED';
export const FETCH_ENDPOINTS_ERROR = 'FETCH_ENDPOINTS_ERROR';
export const FETCH_ENDPOINTS_START = 'FETCH_ENDPOINTS_START';
export const FETCH_ENDPOINTS_SUCCESS = 'FETCH_ENDPOINTS_SUCCESS';

export function fetchEndpoints({ location, params, token }) {
  return ({ fetch }) => ({
    type: 'FETCH_ENDPOINTS',
    payload: {
      promise: fetch('/api/v1/endpoints/list', {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        return { endpoints: [] };
      }),
    },
  });
}

export function selectEndpoints(endpointIds) {
  return ({
    type: ENDPOINTS_SELECTED,
    payload: endpointIds,
  });
}

export function deleteEndpoints(location, token, endpointIds) {
  return ({
    type: ENDPOINTS_DELETE_REQUESTED,
    payload: new Promise((resolve, reject) => {
      endpointIds.forEach(endpointId => console.log(`Deleting endpoint ${endpointId}`));
      resolve();
    }),
  });
}

export function nextEndpoints() {
  return ({
    type: ENDPOINTS_ON_NEXT_PAGE,
    payload: null,
  });
}

export function previousEndpoints() {
  return ({
    type: ENDPOINTS_ON_PREVIOUS_PAGE,
    payload: null,
  });
}

export function expandEndpoint(endpointId) {
  return ({
    type: ENDPOINTS_ON_EXPAND,
    payload: null,
  });
}
