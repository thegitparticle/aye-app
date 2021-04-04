import {ADD_CLUBHUBDETAILS} from './types';

const INITIAL_STATE = {
  clubhubdetails: {
    membercount: 7,
    framecount: 51,
    members: [
      {
        userid: 3,
        username: 'speadgood',
        name: 'Justin Spear',
        displaypic: 'https://uifaces.co/our-content/donated/vIqzOHXj.jpg',
        frameslive: 1,
      },
    ],
  },
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
