import {ADD_DIRECTSLIST} from './types';
import {usePubNub} from 'pubnub-react';

export const GetDirectsList = (pubnub, user_id) => {
  //const pubnub = usePubNub();

  return dispatch => {
    var res = [];

    pubnub.objects.getMemberships(
      {
        //uuid: state_here.MyProfileReducer.myprofile.user.id,
        uuid: user_id,
        include: {
          channelFields: true,
          customChannelFields: true,
          customFields: true,
        },
        sort: {updated: 'desc'},
      },
      (status, response) => {
        //console.log(response.data);
        res = response.data;
        dispatch({
          type: ADD_DIRECTSLIST,
          payload: res,
        });
      },
    );
  };
};
