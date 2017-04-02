/*
 *
 * Login actions
 *
 */

import {
  TRY_LOGIN,
  FAILED_LOGIN,
  SUCCESS_LOGIN,
} from './constants';

export function tryLogin(data) {
  return {
    type: TRY_LOGIN,
    data,
  };
}

export function failedLogin(err) {
  return {
    type: FAILED_LOGIN,
    err,
  };
}

export function loginSuccess(data) {
  return {
    type: SUCCESS_LOGIN,
    data,
  };
}
