// selectLocationState expects a plain JS object for the routing state
import { createSelector } from 'reselect';
import isEmpty from 'utils/isEmpty';

const selectCommon = (state) => state.get('common');

const makeSelectNotification = () => createSelector(
  selectCommon,
  (commonState) => commonState.get('notification').toJS()
);

const makeSelectUser = () => {
  return (state) => {
    const selectUser = state.get('common').get('user');
    return '';
  };
};

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectLocationState,
  makeSelectNotification,
  makeSelectUser,
};
