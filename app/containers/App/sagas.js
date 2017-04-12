import { call, put, take, cancel } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import request from 'utils/request';
import { notify, userLogin } from '../App/actions';
import { push, LOCATION_CHANGE } from 'react-router-redux';

import {
  GET_USER,
  LOGOUT,
  CREATE_CATEGORY,
} from './constants';

export function* getUserInfo() {
  const params = {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const answer = yield call(request, '/get-user-info', params);
    yield put(userLogin(answer.user));
  } catch (err) {
    yield put(notify('Logout error.'));
  }
}

export function* logoutUser() {
  const params = {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield call(request, '/logout', params);
    sessionStorage.removeItem('user_authorized');
    yield put(push('/login'));
  } catch (err) {
    yield put(push('/login'));
  }
}

export function* newCategory(action) {
  console.log(action);
  const params = {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.data),
  };
  try {
    yield call(request, '/create-category', params);
  } catch (err) {
    console.log(err);
    yield put(notify('Something wrong happened. Please try again.'));
  }
}

export function* userInfoSagga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_USER, getUserInfo);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* userLogoutSagga() {
  yield takeLatest(LOGOUT, logoutUser);
}

export function* createCategorySagga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeEvery(CREATE_CATEGORY, newCategory);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  userInfoSagga,
  userLogoutSagga,
  createCategorySagga,
];
