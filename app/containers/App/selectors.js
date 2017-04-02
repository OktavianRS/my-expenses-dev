// selectLocationState expects a plain JS object for the routing state
import { createSelector } from 'reselect';

const selectCommon = (state) => state.get('common');

const makeSelectNotification = () => createSelector(
  selectCommon,
  (commonState) => commonState.get('notification').toJS()
);

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
};
