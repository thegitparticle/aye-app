import {ADD_RECOONTYPE} from './types';

const INITIAL_STATE = {
  recos: [],
};

const RecoOnTypeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RECOONTYPE:
      var recos = action.payload;

      const newState = {recos};

      return newState;

    default:
      return state;
  }
};

export default RecoOnTypeReducer;
