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
import * as actions from '../actions/view';
import { User } from '../../../api/users/types';
import { Action } from '../../../api/actions/types';
import { Distillery } from '../../../api/distilleries/types';

/**
 * State shape of the AlertView reducer.
 */
export interface State {
  /** Current list of users. */
  users: User[];
  /** List of distilleries that have alerts associated with them. */
  distilleries: Distillery[];
  /** Current list of actions that can be performed on an alert. */
  actions: Action[];
}

/**
 * Initial state of the AlertView reducer.
 * @type {State}
 */
const INITIAL_STATE: State = {
  actions: [],
  distilleries: [],
  users: [],
};

/**
 * Object used to map reducer functions to action types modifying the
 * AlertView reducer state.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<State, any> = {};

/**
 * Updates the AlertView reducer based on a(n)
 * FETCH_VIEW_RESOURCES_SUCCESS action.
 * @param state Current AlertView reducer state.
 * @param action FETCH_VIEW_RESOURCES_SUCCESS action.
 * @returns {State} Updated AlertView reducer state.
 */
reducers[actions.FETCH_VIEW_RESOURCES_SUCCESS] = (
  state: State,
  action: actions.FetchViewResourcesSuccessAction,
): State => {
  const update: Partial<State> = {
    actions: action.payload.actions,
    distilleries: action.payload.distilleries,
    users: action.payload.users,
  };

  return Object.assign({}, state, update);
};

/**
 * AlertView reducer.
 * @type {Reducer<State, any>}
 */
export const reducer = handleActions<State, any>(reducers, INITIAL_STATE);
