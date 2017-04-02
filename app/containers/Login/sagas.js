import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'utils/request';
import { failedLogin } from './actions';
import { userLogin, notify } from '../App/actions';
import { push } from 'react-router-redux';

import {
  TRY_LOGIN,
} from './constants';

export function* login(action) {
  const params = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.data),
  };
  try {
    const repos = yield call(request, '/login', params);
    if (repos.user) {
      yield put(userLogin(repos.user));
      yield put(push('/dashboard'));
    } else {
      yield put(notify('User name or password incorrect!'));
    }
  } catch (err) {
    yield put(failedLogin(err));
  }
}

export function* loginSagga() {
  yield takeLatest(TRY_LOGIN, login);
}

// All sagas to be loaded
export default [
  loginSagga,
];
