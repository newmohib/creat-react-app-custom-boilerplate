import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginDomain = state => state.signin || initialState;



const makeSelectSigninInfo= () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

  export { makeSelectSigninInfo};