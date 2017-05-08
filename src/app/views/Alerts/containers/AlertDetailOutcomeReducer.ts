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
import {
  Reducer,
  ReducerMap,
  handleActions,
} from 'redux-actions';

// Local
import * as actions from './AlertDetailOutcomeActions';
import { AlertOutcomeChoices } from '../../../api/alerts/types';

/** State shape of the alert detail outcome reducer. */
export interface AlertDetailOutcomeState {
  /** If the outcome form is shown. */
  active: boolean;
  /** Outcome to change to. */
  outcome: AlertOutcomeChoices;
  /** Notes to change to. */
  notes: string;
}

/**
 * Initial state of the alert detail outcome reducer.
 * @type {State}
 */
const INITIAL_STATE: AlertDetailOutcomeState = {
  active: false,
  outcome: null,
  notes: '',
};

/**
 * Reducer map for the alert detail outcome reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<AlertDetailOutcomeState, any> = {};

/**
 * Updates the AlertDetailOutcomeSelectReducer based on a(n) OPEN action.
 * @param state Current AlertDetailOutcomeSelectReducer state.
 * @param action OPEN action.
 * @returns {State} Updated AlertDetailOutcomeSelectReducer state.
 */
reducers[actions.OPEN] = (
  state: AlertDetailOutcomeState,
  action: actions.OpenAction,
): AlertDetailOutcomeState => {
  const update: Partial<AlertDetailOutcomeState> = {
    active: true,
    outcome: action.payload.outcome,
    notes: action.payload.notes,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertDetailOutcomeSelectReducer based on a(n) CLOSE action.
 * @param state Current AlertDetailOutcomeSelectReducer state.
 * @param action CLOSE action.
 * @returns {State} Updated AlertDetailOutcomeSelectReducer state.
 */
reducers[actions.CLOSE] = (
  state: AlertDetailOutcomeState,
  action: actions.CloseAction,
): AlertDetailOutcomeState => {
  return Object.assign({}, state, INITIAL_STATE);
};

/**
 * Updates the AlertDetailOutcomeSelectReducer based on a(n) CHANGE_OUTCOME action.
 * @param state Current AlertDetailOutcomeSelectReducer state.
 * @param action CHANGE_OUTCOME action.
 * @returns {State} Updated AlertDetailOutcomeSelectReducer state.
 */
reducers[actions.CHANGE_OUTCOME] = (
  state: AlertDetailOutcomeState,
  action: actions.ChangeOutcomeAction,
): AlertDetailOutcomeState => {
  const update: Partial<AlertDetailOutcomeState> = {
    outcome: action.payload,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertDetailOutcomeSelectReducer based on a(n) CHANGE_NOTES action.
 * @param state Current AlertDetailOutcomeSelectReducer state.
 * @param action CHANGE_NOTES action.
 * @returns {State} Updated AlertDetailOutcomeSelectReducer state.
 */
reducers[actions.CHANGE_NOTES] = (
  state: AlertDetailOutcomeState,
  action: actions.ChangeNotesAction,
): AlertDetailOutcomeState => {
  const update: Partial<AlertDetailOutcomeState> = {
    notes: action.payload,
  };

  return Object.assign({}, state, update);
};

/**
 * AlertDetailOutcome reducer.
 * @type {Reducer<State, any>}
 */
export const AlertDetailOutcomeReducer = handleActions<
  AlertDetailOutcomeState,
  any
>(
  reducers,
  INITIAL_STATE,
);
