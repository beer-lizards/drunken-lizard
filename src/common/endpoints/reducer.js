import { Map, Record } from 'immutable';

import * as actions from './actions';
import Endpoint from './endpoint';

const InitialState = Record({
  map: Map(),
  selected: [],
});
const initialState = new InitialState();

// Note how JSON from server is revived to immutable record.
const revive = ({ map }) => initialState.merge({
  map: Map(map).map(endpoint => new Endpoint(endpoint)),
});

export default function endpointsReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);
  switch (action.type) {
    case actions.FETCH_ENDPOINTS_SUCCESS: {
      const data = action.payload.endpoints.reduce((old, endpoint) => {
        old[endpoint.endpointId] = endpoint;
        return old;
      }, {});
      const endpoints = new Map(data).map(endpoint => new Endpoint(endpoint));
      return state.update('map', map => map.merge(endpoints));
    }
    case actions.FETCH_ENDPOINTS_FAILURE: {
      return state.update('map', new Map());
    }
    case actions.ENDPOINTS_SELECTED: {
      const endpointIds = action.payload;
      return state.set('selected', endpointIds);
    }
    case actions.ENDPOINTS_DELETE_REQUESTED: {

    }
    default: {
      return state;
    }
  }
}
