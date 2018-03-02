// Local
import { alertDetailTagReducer, INITIAL_STATE, AlertDetailTagState } from './alertDetailTagReducer';
import * as actions from './alertDetailTagActions';

describe('alertDetailTagReducer()', () => {
  it('should respond to a OPEN_TAG_PANEL action', () => {
    const state = alertDetailTagReducer(undefined, actions.openTagPanel());
    const expected: AlertDetailTagState = { ...INITIAL_STATE, panelIsActive: true };

    expect(state).toEqual(expected);
  });

  it('should respond to a CLOSE_TAG_PANEL action', () => {
    const state = alertDetailTagReducer(undefined, actions.closeTagPanel());
    const expected: AlertDetailTagState = { ...INITIAL_STATE, panelIsActive: false };

    expect(state).toEqual(expected);
  });
});
