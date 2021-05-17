import {ADD_MYNUDGETOLIST} from './types';

const INITIAL_STATE = {
  mynudgetolist: [
    {
      id: 0,
      username: '....',
      name: '',
      profile_pic: '',
    },
  ],
};

const MyNudgeToListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MYNUDGETOLIST:
      var mynudgetolist = action.payload;

      const newState = {mynudgetolist};

      return newState;

    default:
      return state;
  }
};

export default MyNudgeToListReducer;
