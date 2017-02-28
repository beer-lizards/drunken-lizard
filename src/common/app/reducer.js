import * as actions from './actions';

const initialState = {
  drawerOpen: false,
  rehydrated: false,
};

const reducer = (
  state = initialState,
  action,
) => {
  if (state === initialState) {
    return initialState;
  }

  switch (action.type) {

    case actions.ON_APP_REHYDRATE: {
      return {
        ...state,
        rehydrated: true,
      };
    }

    case actions.DRAWER_OPEN: {
      return {
        ...state,
        drawerOpen: true,
      };
    }

    case actions.DRAWER_CLOSED: {
      return {
        ...state,
        drawerOpen: false,
      };
    }

    default:
      return state;

  }
};

export default reducer;
