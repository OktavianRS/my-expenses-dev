import {
  USER_LOGIN,
  NOTIFIED,
  NOTIFY,
} from './constants';

export function userLogin(data) {
  return {
    type: USER_LOGIN,
    data,
  };
}

export function notified() {
  return {
    type: NOTIFIED,
  };
}

export function notify(data) {
  return {
    type: NOTIFY,
    data,
  };
}
