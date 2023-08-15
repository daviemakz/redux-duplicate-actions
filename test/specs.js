'use strict';

// Load NPM modules
import { assert } from 'chai';
import reduxDuplicateActions from '../dist/index';

// Get middleware instalce
const middlewareFatal = new reduxDuplicateActions({ fatal: true });
const middlewareNonFatal = new reduxDuplicateActions({ fatal: false });

// Remove console.warn
console.warn = () => {};

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
    bool: true
  }
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
    bool: true
  }
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
    bool: true
  }
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
    bool: true
  }
};

const actionFive = {
  type: 'TEST_ACTION_THREE',
  payload: state => {
    return {
      ...state,
      string: 'Ahh well...',
      number: 100,
      object: {
        a: 1
      },
      bool: true
    };
  }
};

// Test
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
      middlewareFatal({ dispatch, getState })(next)(actionOne);
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
      middlewareFatal({ dispatch, getState })(next)(actionOne);
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
      middlewareFatal({ dispatch, getState })(next)(actionTwo);
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
      middlewareFatal({ dispatch, getState })(next)(actionTwo);
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
      middlewareFatal({ dispatch, getState })(next)(actionThree);
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
      middlewareFatal({ dispatch, getState })(next)(actionThree);
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
      middlewareFatal({ dispatch, getState })(next)(actionFour);
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
      middlewareFatal({ dispatch, getState })(next)(actionFour);
    }, TypeError);
  });

  it('action type: five | should not throw a "TypeError", non duplicate action', () => {
    const state = {
      randomKey: 'randomValue'
    };
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareFatal({ dispatch, getState })(next)(actionFive);
    }, TypeError);
  });

  it('action type: five | should throw a "TypeError", duplicate action', () => {
    const state = {
      randomKey: 'randomValue'
    };
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.throws(() => {
      middlewareFatal({ dispatch, getState })(next)(actionFive);
    }, TypeError);
  });

  it('action type: one | should not throw a "TypeError", non duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionOne);
    }, TypeError);
  });

  it('action type: one | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionOne);
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
      middlewareNonFatal({ dispatch, getState })(next)(actionTwo);
    }, TypeError);
  });

  it('action type: two | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionTwo);
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
      middlewareNonFatal({ dispatch, getState })(next)(actionThree);
    }, TypeError);
  });

  it('action type: three | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionThree);
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
      middlewareNonFatal({ dispatch, getState })(next)(actionFour);
    }, TypeError);
  });

  it('action type: four | should throw a "TypeError", duplicate action', () => {
    const state = {};
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionFour);
    }, TypeError);
  });

  it('action type: five | should not throw a "TypeError", non duplicate action', () => {
    const state = {
      randomKey: 'randomValue'
    };
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionFive);
    }, TypeError);
  });

  it('action type: five | should throw a "TypeError", duplicate action', () => {
    const state = {
      randomKey: 'randomValue'
    };
    const getState = () => state;
    const next = () => {
      const state = getState();
      state.prop = 0;
    };
    assert.doesNotThrow(() => {
      middlewareNonFatal({ dispatch, getState })(next)(actionFive);
    }, TypeError);
  });
});
