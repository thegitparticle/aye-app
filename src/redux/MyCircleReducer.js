import {ADD_MYCIRCLE} from './types';

const INITIAL_STATE = {
  mycircle: [
    {
      userid: 0,
      username: '',
      name: 'loading...',
      displaypic: '',
    },
  ],
};

const MyCircleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MYCIRCLE:
      var mycircle = action.payload;

      const newState = {mycircle};

      return newState;

    default:
      return state;
  }
};

export default MyCircleReducer;
