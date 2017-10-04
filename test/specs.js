import { assert } from 'chai';
import sinon from 'sinon';
import checkDispatch from '../src/index';

describe('redux-duplicate-actions', () => {
  const dispatch = () => {};

  it('should not throw an error due to first time running', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      checkDispatch({ dispatch, getState })(next)();
    }, TypeError);
  });

  it('should throw an error due to second time running', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      checkDispatch({ dispatch, getState })(next)();
    }, TypeError);
  });
});
