'use strict';

import { assert } from 'chai';
import sinon from 'sinon';
import checkDispatch from '../src/index';

// Define actions
const actionOne = {
  type: 'TEST_ACTION_ONE',
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
const actionTwo = {
  type: 'TEST_ACTION_ONE',
  payload: {
    string: 'self',
    number: 1,
    object: {},
    nothing: undefined,
    func: () => {},
    array: [1, 2, 3, 4, 5, 6],
    bool: true,
  },
};
const actionThree = {
  type: 'TEST_ACTION_TWO',
  payload: {
    string: 'objects',
    number: 1,
    object: {},
    nothing: undefined,
    func: () => {},
    array: [1, 2, 3, 4, 5, 6],
    bool: true,
  },
};
const actionFour = {
  type: 'TEST_ACTION_TWO',
  payload: {
    string: 'Why are you looking at this file? Dont you trust me?',
    number: 1,
    object: {},
    nothing: undefined,
    func: () => {},
    array: [1, 2, 3, 4, 5, 6],
    bool: true,
  },
};

describe('redux-duplicate-actions', () => {
  const dispatch = () => {};

  it('action type: one | should not throw a "TypeError", non duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      checkDispatch({ dispatch, getState })(next)(actionOne);
    }, TypeError);
  });

  it('action type: one | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      checkDispatch({ dispatch, getState })(next)(actionOne);
    }, TypeError);
  });

  it('action type: two | should not throw a "TypeError", non duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      checkDispatch({ dispatch, getState })(next)(actionTwo);
    }, TypeError);
  });

  it('action type: two | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      checkDispatch({ dispatch, getState })(next)(actionTwo);
    }, TypeError);
  });

  it('action type: three | should not throw a "TypeError", non duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      checkDispatch({ dispatch, getState })(next)(actionThree);
    }, TypeError);
  });

  it('action type: three | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      checkDispatch({ dispatch, getState })(next)(actionThree);
    }, TypeError);
  });

  it('action type: four | should not throw a "TypeError", non duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      checkDispatch({ dispatch, getState })(next)(actionFour);
    }, TypeError);
  });

  it('action type: four | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      checkDispatch({ dispatch, getState })(next)(actionFour);
    }, TypeError);
  });
});
