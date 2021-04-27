import {ADD_MYPROFILEDETAILS} from './types';

const INITIAL_STATE = {
  myprofile: {
    user: {
      username: 'loading',
      phone: '',
      full_name: 'loading',
      id: 0,
      clubs_joined_by_user: '',
      number_of_clubs_joined: 0,
      contact_list: '',
      total_frames_participation: 0,
      country_code_of_user: '',
    },
    bio: 'blahed',
  },
};

const MyProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MYPROFILEDETAILS:
      var myprofile = action.payload;

      const newState = {myprofile};

      return newState;

    default:
      return state;
  }
};

export default MyProfileReducer;
