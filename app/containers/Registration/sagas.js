import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'utils/request';
import { failedRegister } from './actions';
import { userLogin, notify } from '../App/actions';
import { push } from 'react-router-redux';

import {
  TRY_REGISTER,
} from './constants';

export function* register(action) {
  const params = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.data),
  };
  try {
    const repos = yield call(request, '/registration', params);
    if (repos.user) {
      yield put(userLogin(repos.user));
      yield put(push('/dashboard'));
    } else if (repos.status === 'registered') {
      yield put(notify('User already registered'));
    } else {
      yield put(notify('Something went wrong. Registration failure.'));
    }
  } catch (err) {
    yield put(failedRegister(err));
  }
}

export function* registerSagga() {
  yield takeLatest(TRY_REGISTER, register);
}

// All sagas to be loaded
export default [
  registerSagga,
];
