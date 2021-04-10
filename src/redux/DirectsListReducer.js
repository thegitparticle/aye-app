import {ADD_DIRECTSLIST} from './types';

const INITIAL_STATE = {
  directslist: [
    {
      channel: {
        custom: null,
        description: null,
        eTag: '...',
        id: '...',
        name: null,
        updated: '...',
      },
      custom: {
        other_user_image: '...',
        other_user_name: '...',
        type: '...',
      },
      eTag: '...',
      updated: '...',
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
