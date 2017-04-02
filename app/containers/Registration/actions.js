import {
  TRY_REGISTER,
  FAILED_REGISTER,
  SUCCESS_REGISTER,
} from './constants';

export function tryRegister(data) {
  return {
    type: TRY_REGISTER,
    data,
  };
}

export function failedRegister(err) {
  return {
    type: FAILED_REGISTER,
    err,
  };
}

export function registerSuccess(data) {
  return {
    type: SUCCESS_REGISTER,
    data,
  };
}
