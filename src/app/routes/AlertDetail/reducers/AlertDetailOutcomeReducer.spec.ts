/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import * as chai from 'chai';

// Local
import {
  AlertDetailOutcomeReducer,
  INITIAL_STATE,
} from './AlertDetailOutcomeReducer';
import * as actions from '../actions/AlertDetailOutcomeActions';

describe('AlertDetailOutcomeReducer', () => {
  describe('OPEN', () => {
    it('should update the state with the given payload stores', () => {
      const outcome = 'completed';
      const notes = 'notes';
      const action = actions.open(outcome, notes);
      const state = AlertDetailOutcomeReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        active: true,
        outcome,
        notes,
      });
    });
  });

  describe('CLOSE', () => {
    it('should return the initial state', () => {
      const action = actions.close();
      const state = AlertDetailOutcomeReducer({} as any, action);

      chai.expect(state).to.deep.equal(INITIAL_STATE);
    });
  });

  describe('CHANGE_OUTCOME', () => {
    it('should update the state with the given payload stores', () => {
      const outcome = 'completed';
      const action = actions.changeOutcome(outcome);
      const state = AlertDetailOutcomeReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        outcome,
      });
    });
  });

  describe('CHANGE_NOTES', () => {
    it('should update the state with the given payload stores', () => {
      const notes = 'notes';
      const action = actions.changeNotes(notes);
      const state = AlertDetailOutcomeReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        notes,
      });
    });
  });

  describe('OPEN_REMOVE_PANEL', () => {
    it('should update the state with the given payload stores', () => {
      const action = actions.openRemovePanel();
      const state = AlertDetailOutcomeReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        showRemovePanel: true,
      });
    });
  });

  describe('CLOSE_REMOVE_PANEL', () => {
    it('should update the state with the given payload stores', () => {
      const action = actions.closeRemovePanel();
      const state = AlertDetailOutcomeReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        showRemovePanel: false,
      });
    });
  });
});
