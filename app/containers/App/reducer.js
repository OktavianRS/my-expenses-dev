/*
 *
 * Registration reducer
 *
 */

import { fromJS } from 'immutable';
import {
  USER_LOGIN,
  NOTIFIED,
  NOTIFY,
  LOGOUT,
} from './constants';

const initialState = fromJS({
  user: {
    username: '',
  },
  notification: {
    notify: false,
    message: '',
  },
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state
        .setIn(
          ['user'], action.data,
        );
    case LOGOUT:
      return state
        .setIn(
          ['user'], {},
        );
    case NOTIFY:
      return state
      .setIn(
        ['notification', 'notify'], true
      )
      .setIn(
        ['notification', 'message'], action.data
      );
    case NOTIFIED:
      return state
      .setIn(
        ['notification', 'notify'], false
      )
      .setIn(
        ['notification', 'message'], ''
      );
    default:
      return state;
  }
}

export default userReducer;
