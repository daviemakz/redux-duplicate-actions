import { assert } from 'chai';
import sinon from 'sinon';
import checkDispatch from '../src/index';

describe('redux-duplicate-actions', () => {
  const dispatch = () => {};
  const action = {
    type: 'TEST_ACTION',
    payload: {
      string: 'this',
      number: 1,
      object: {},
      nothing: undefined,
      func: () => {},
      array: [1, 2, 3, 4, 5, 6],
      bool: true,
    },
  };
  it('should not throw an error due to first time running', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      checkDispatch({ dispatch, getState })(next)(action);
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
      checkDispatch({ dispatch, getState })(next)(action);
    }, TypeError);
  });
});
