import {ADD_DIRECTSLIST} from './types';
import {usePubNub} from 'pubnub-react';

export const GetDirectsList = (pubnub, user_id) => {
  //const pubnub = usePubNub();

  return dispatch => {
    var res = [];
    //console.log('get my profile dispatched');
    //console.log(phone);

    /*
    axios
      .get('https://apisayepirates.life/api/users/profile/' + phone)
      .then(response => (res = response.data))
      .then(() => console.log(res))
      .then(() =>
        dispatch({
          type: ADD_DIRECTSLIST,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
*/
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
