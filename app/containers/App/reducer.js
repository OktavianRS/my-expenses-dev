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
} from './constants';

const initialState = fromJS({
  user: {},
  notification: {
    notify: false,
    message: '',
  },
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state.merge({
        ...action.data,
      });
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
