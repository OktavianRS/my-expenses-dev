import {
  USER_LOGIN,
  NOTIFIED,
  NOTIFY,
  GET_USER,
  LOGOUT,
  CREATE_CATEGORY,
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

export function createCategory(data) {
  return {
    type: CREATE_CATEGORY,
    data,
  };
}

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
