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
import * as actions from '../actions/searchQueryActions';
import {
  AlertSearchResults,
  DistilleryListSearchResults,
  SearchQuery,
} from '~/services/search/types';

/** SearchQueryState shape of the SearchQuery reducer. */
export interface SearchQueryState {
  valid: boolean;
  query: SearchQuery | null;
  total: number;
  loading: boolean;
  alerts: AlertSearchResults | null;
  distilleries: DistilleryListSearchResults | null;
}

/**
 * Initial state of the SearchQuery reducer.
 * @type {State}
 */
const INITIAL_STATE: SearchQueryState = {
  total: 0,
  valid: true,
  query: null,
  alerts: null,
  distilleries: null,
  loading: false,
};

/**
 * Reducer map for the SearchQuery reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<SearchQueryState, any> = {};

/**
 * Updates the SearchQueryReducer based on a(n) GENERAL_QUERY_PENDING action.
 * @param state Current SearchQueryReducer state.
 * @param action GENERAL_QUERY_PENDING action.
 * @returns {State} Updated SearchQueryReducer state.
 */
reducers[actions.GENERAL_QUERY_PENDING] = (
  state: SearchQueryState,
  action: actions.GeneralQueryPendingAction,
): SearchQueryState => {
  const update: Partial<SearchQueryState> = {
    loading: true,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the SearchQueryReducer based on a(n) GENERAL_QUERY_SUCCESS action.
 * @param state Current SearchQueryReducer state.
 * @param action GENERAL_QUERY_SUCCESS action.
 * @returns {State} Updated SearchQueryReducer state.
 */
reducers[actions.GENERAL_QUERY_SUCCESS] = (
  state: SearchQueryState,
  action: actions.GeneralQuerySuccessAction,
): SearchQueryState => {
  const update: Partial<SearchQueryState> = {
    valid: true,
    query: action.payload.query,
    total: action.payload.results.count,
    alerts: action.payload.results.alerts,
    distilleries: action.payload.results.distilleries,
    loading: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the SearchQueryReducer based on a(n) GENERAL_QUERY_FAILED action.
 * @param state Current SearchQueryReducer state.
 * @param action GENERAL_QUERY_FAILED action.
 * @returns {State} Updated SearchQueryReducer state.
 */
reducers[actions.GENERAL_QUERY_FAILED] = (
  state: SearchQueryState,
  action: actions.GeneralQueryFailedAction,
): SearchQueryState => {
  const update: Partial<SearchQueryState> = {
    valid: false,
    query: action.payload.query,
    loading: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the SearchQueryReducer based on a(n) ALERT_QUERY_SUCCESS action.
 * @param state Current SearchQueryReducer state.
 * @param action ALERT_QUERY_SUCCESS action.
 * @returns {State} Updated SearchQueryReducer state.
 */
reducers[actions.ALERT_QUERY_SUCCESS] = (
  state: SearchQueryState,
  action: actions.AlertQuerySuccessAction,
): SearchQueryState => {
  const update: Partial<SearchQueryState> = {
    alerts: action.payload.results,
    loading: false,
  };

  return Object.assign({}, state, update);
};

/**
 * SearchQuery reducer.
 * @type {@type {Reducer<SearchQueryState, any>}
 */
export const SearchQueryReducer = handleActions<SearchQueryState, any>(
  reducers,
  INITIAL_STATE,
);
