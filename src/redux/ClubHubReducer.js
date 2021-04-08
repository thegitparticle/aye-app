import {ADD_CLUBHUBDETAILS} from './types';

const INITIAL_STATE = {
  id: 0,
  name: 'loading',
  member_count: 0,
  date_created: '2021-03-21T16:34:48+05:30',
  profile_picture:
    'https://apisayepirates.life/media/club_images/Screen_Shot_2021-03-21_at_11.24.44_AM.png',
  frames_total: 1,
  members: '0,0',
  admin_leader: '0',
  users: [
    {
      user_id: 0,
      username: 'loading',
      name: 'loading',
      display_pic:
        'https://apisayepirates.life/mediaprofile_pics/cubist_k01mLyL.jpg',
    },
    {
      user_id: 0,
      username: 'loading',
      name: 'loading',
      display_pic: 'https://apisayepirates.life/mediaprofile_pics/chat.jpg',
    },
  ],
};

const ClubHubDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CLUBHUBDETAILS:
      var clubhubdetails = action.payload;

      const newState = {clubhubdetails};

      return newState;

    default:
      return state;
  }
};

export default ClubHubDetailsReducer;
