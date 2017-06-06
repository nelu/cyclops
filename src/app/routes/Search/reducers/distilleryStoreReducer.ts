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
import * as actions from '../actions/distilleryStoreActions';
import { NormalizedDistilleryList } from '~/services/distilleries/types';

/** State shape of the distillery store reducer. */
export type DistilleryStoreState = NormalizedDistilleryList;

/**
 * Initial state of the distillery store reducer.
 * @type {State}
 */
const INITIAL_STATE: DistilleryStoreState = {
  result: [],
  entities: {},
};

/**
 * Reducer map for the distillery store reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<DistilleryStoreState, any> = {};

/**
 * Updates the distilleryStoreReducer based on a(n) FETCH_DISTILLERIES_SUCCESS action.
 * @param state Current distilleryStoreReducer state.
 * @param action FETCH_DISTILLERIES_SUCCESS action.
 * @returns {State} Updated distilleryStoreReducer state.
 */
reducers[actions.FETCH_DISTILLERIES_SUCCESS] = (
  state: DistilleryStoreState,
  action: actions.FetchDistilleriesSuccessAction,
): DistilleryStoreState => {
  const update: Partial<DistilleryStoreState> = action.payload;

  return Object.assign({}, state, update);
};

/**
 * Distillery store reducer.
 * @type {@type {Reducer<State, any>}
 */
export const distilleryStoreReducer = handleActions<DistilleryStoreState, any>(
  reducers,
  INITIAL_STATE,
);
