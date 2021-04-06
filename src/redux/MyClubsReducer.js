import {ADD_MYCLUBS} from './types';

const INITIAL_STATE = {
  myclubs: [
    {
      club_id: 0,
      club_name: '',
      club_image: '',
      club_members: [34, 45, 65, 23, 41],
      frames_count: 0,
    },
  ],
};

const MyClubsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MYCLUBS:
      var myclubs = action.payload;

      const newState = {myclubs};

      return newState;

    default:
      return state;
  }
};

export default MyClubsReducer;
