import {ADD_DIRECTSLIST} from './types';

const INITIAL_STATE = {
  directslist: [
    {
      direct_channel_id: '0',
      display_guys: {
        user_id: '0',
        profile_picture: '',
        full_name: '...',
      },
      frame_total: 0,
      ongoing_frame: false,
      start_time: null,
      end_time: null,
    },
  ],
};

const DirectsListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DIRECTSLIST:
      var directslist = action.payload;

      const newState = {directslist};

      return newState;

    default:
      return state;
  }
};

export default DirectsListReducer;
