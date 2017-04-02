import expect from 'expect';
import registrationReducer from '../reducer';
import { fromJS } from 'immutable';

describe('registrationReducer', () => {
  it('returns the initial state', () => {
    expect(registrationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
