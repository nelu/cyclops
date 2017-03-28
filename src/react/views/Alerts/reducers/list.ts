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
import * as _ from 'lodash';

// Local
import { ReduxAction } from '../../../types/redux';
import * as actions from '../actions/list';
import {
  UPDATE_ALERT_SUCCESS,
  UpdateAlertSuccessPayload,
} from '../actions/detail';
import {
  AlertListItem,
  AlertSearchParams,
} from '../../../api/alerts/types';

/** State shape of the AlertList reducer. */
export interface State {
  /** Total number of alerts matching the search parameters. */
  count: number;
  /** List of alerts matching search parameters. */
  alerts: AlertListItem[];
  /** If the list of alerts is being fetched. */
  loading: boolean;
  /** Search parameters used to search for alerts. */
  params: AlertSearchParams;
  /** String value in the search bar. */
  search: string;
  /** If the alert list is currently polling for alerts. */
  polling: boolean;
  /** Time in milliseconds of the interval the poller will use. */
  interval: number;
  /** Timeout ID of the poller timeout. */
  timeout: number | null;
  /** If polling is currently enabled. */
  pollingEnabled: boolean;
  /** Promise ID of the request. */
  promiseId: string | null;
}

/**
 * Initial state of the AlertList reducer.
 * @type {State}
 */
const INITIAL_STATE: State = {
  alerts: [],
  count: 0,
  interval: 5000,
  loading: false,
  params: {},
  polling: true,
  search: '',
  timeout: null,
  pollingEnabled: true,
  promiseId: null,
};

/**
 * Mapped reducer functions that make up the AlertList reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<State, any> = {};

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_PENDING action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_PENDING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_PENDING] = (
  state: State,
  action: ReduxAction<actions.SearchAlertsPendingPayload>,
): State => {
  const update: Partial<State> = {
    loading: true,
    params: action.payload.params,
    polling: false,
    pollingEnabled: action.payload.poll,
    promiseId: action.payload.promiseId,
  };

  // Cancel the timeout for polling alerts.
  if (state.timeout) window.clearTimeout(state.timeout);

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_SUCCESS] = (
  state: State,
  action: ReduxAction<actions.SearchAlertsSuccessPayload>,
): State => {
  const update: Partial<State> = {
    alerts: action.payload.alerts,
    count: action.payload.count,
    loading: false,
    polling: action.payload.polling,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_FAILURE action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_FAILURE action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_FAILURE] = (
  state: State,
  action: ReduxAction<actions.SearchAlertsFailurePayload>,
): State => {
  const update: Partial<State> = {
    loading: false,
    polling: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) POLL_ALERTS_PENDING action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_PENDING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_PENDING] = (
  state: State,
  action: ReduxAction<actions.PollAlertsPendingPayload>,
): State => {
  const update: Partial<State> = {
    promiseId: action.payload.promiseId,
    polling: true,
    pollingEnabled: true,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a POLL_ALERTS_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_SUCCESS] = (
  state: State,
  action: ReduxAction<actions.PollAlertsSuccessPayload>,
): State => {
  const update: Partial<State> = {
    alerts: action.payload.alerts,
    count: action.payload.count,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) POLL_ALERTS_FAILURE action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_FAILURE action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_FAILURE] = (
  state: State,
  action: ReduxAction<actions.PollAlertsFailurePayload>,
): State => {
  const update: Partial<State> = {
    polling: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) POLL_ALERTS_WAIT action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_WAIT action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_WAIT] = (
  state: State,
  action: ReduxAction<actions.PollAlertsWaitPayload>,
): State => {
  const update: Partial<State> = {
    interval: action.payload.interval,
    timeout: action.payload.timeoutId,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) STOP_POLLING action.
 * @param state Current AlertList reducer state.
 * @param action STOP_POLLING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.STOP_POLLING] = (
  state: State,
  action: ReduxAction<actions.StopPollingPayload>,
): State => {
  const update: Partial<State> = {
    polling: false,
    timeout: null,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) DISABLE_POLLING action.
 * @param state Current AlertList reducer state.
 * @param action DISABLE_POLLING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.DISABLE_POLLING] = (
  state: State,
  action: ReduxAction<actions.DisablePollingPayload>,
): State => {
  const update: Partial<State> = {
    polling: false,
    pollingEnabled: false,
    timeout: null,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) UPDATE_ALERT_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action UPDATE_ALERT_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[UPDATE_ALERT_SUCCESS] = (
  state: State,
  action: ReduxAction<UpdateAlertSuccessPayload>,
): State => {
  // Find array index of alert.
  const alertIndex = state.alerts.findIndex(
    (alert) => alert.id === action.payload.id,
  );

  // If no index, return the current state.
  if (alertIndex === -1) return state;

  // Copy alert array.
  const copiedAlerts = state.alerts.slice();
  // Take out only the fields to update.
  const fields = _.pick(
    action.payload,
    ['level', 'status', 'assigned_user'],
  );

  // Assign new fields to alert object and place at the array index.
  copiedAlerts[alertIndex] = Object.assign(
    {},
    copiedAlerts[alertIndex],
    fields,
  );

  // Type check state update.
  const update: Partial<State> = { alerts: copiedAlerts };

  return Object.assign({}, state, update);
};

/**
 * AlertList reducer.
 * @type {Reducer<State, any>}
 */
export const reducer = handleActions<State, any>(reducers, INITIAL_STATE);
