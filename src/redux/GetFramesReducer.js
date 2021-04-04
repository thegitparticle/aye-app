import {ADD_FRAMES} from './types';

const INITIAL_STATE = {
  frames_details: [
    {
      id: 5,
      live: false,
      link:
        'https://9fafe520-9e34-4eea-8dba-54e62348f864.mock.pstmn.io/31/frames_list',
      month: 12,
    },
  ],
};

const GetFramesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FRAMES:
      var frames_details = action.payload;

      const newState = {frames_details};

      return newState;

    default:
      return state;
  }
};

export default GetFramesReducer;
