import {ADD_MYCIRCLE} from './types';

const INITIAL_STATE = {
  mycircle: [
    {
      userid: 4,
      username: 'heartdisease',
      name: 'John Bezzd',
      displaypic: 'https://randomuser.me/api/portraits/men/91.jpg',
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
