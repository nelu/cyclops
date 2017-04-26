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
import { ReducerMap, handleActions } from 'redux-actions';

// Local
import * as actions from '../actions/errorPopup';
import { StoredError } from '../types';

/**
 * Concrete state shape of the ErrorPopup reducer.
 */
export interface State {
  /** Current errors to make the user aware of. */
  errors: StoredError[];
  /** Currently viewed error in the popup. */
  current: number;
}

/**
 * Initial state of the ErrorPopup reducer.
 * @type {State}
 */
const INITIAL_STATE: State = {
  current: 0,
  errors: [],
};

/**
 * Object used to map reducer functions to action types modifying the
 * ErrorPopup reducer state.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<State, any> = {};

/**
 * Updates the ErrorPopup reducer based on a(n) ADD_ERROR action.
 * @param state Current ErrorPopup reducer state.
 * @param action ADD_ERROR action.
 * @returns {State} Updated ErrorPopup reducer state.
 */
export function addError(state: State, action: actions.AddErrorAction): State {
  const update: Partial<State> = {
    errors: [...state.errors, action.payload],
  };

  return Object.assign({}, state, update);
}

reducers[actions.ADD_ERROR] = addError;

/**
 * Updates the ErrorPopup reducer based on a(n) VIEW_ERROR action.
 * @param state Current ErrorPopup reducer state.
 * @param action VIEW_ERROR action.
 * @returns {State} Updated ErrorPopup reducer state.
 */
reducers[actions.VIEW_ERROR] = (
  state: State,
  action: actions.ViewErrorAction,
): State => {
  const update: Partial<State> = {
    current: action.payload,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the ErrorPopup reducer based on a(n) CLEAR_ERRORS action.
 * @param state Current ErrorPopup reducer state.
 * @param action CLEAR_ERRORS action.
 * @returns {State} Updated ErrorPopup reducer state.
 */
reducers[actions.CLEAR_ERRORS] = (
  state: State,
  action: actions.ClearErrorsAction,
): State => {
  return Object.assign({}, state, INITIAL_STATE);
};

/**
 * ErrorPopup reducer.
 * @type {@type {Reducer<State, any>}
 */
export const reducer = handleActions<State, any>(reducers, INITIAL_STATE);
