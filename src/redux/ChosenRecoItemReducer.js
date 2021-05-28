import {ADD_RECOITEM} from './types';

const INITIAL_STATE = {
  reco_item: '',
};

const ChosenRecoItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RECOITEM:
      var reco_item = action.payload;
      const newState = {reco_item};
      return newState;
    default:
      return state;
  }
};

export default ChosenRecoItemReducer;
