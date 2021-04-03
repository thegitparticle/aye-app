import {ADD_MYPROFILEDETAILS} from './types';

const INITIAL_STATE = {
  myprofile: {
    userid: 0,
    username: 'loading',
    name: 'loading',
    clubscount: 0,
    framescount: 0,
    circle: 0,
    displayurl:
      'https://i.postimg.cc/R0gkMkpw/Screen-Shot-2021-04-03-at-9-04-13-PM.png',
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
