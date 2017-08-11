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
import { ReduxAction } from '~/types/redux';
import * as actions from '../actions/AlertViewActions';
import {
  UPDATE_ALERT_SUCCESS,
  UpdateAlertSuccessPayload,
} from '../../AlertDetail/actions/AlertDetailActions';
import {
  AlertListItem,
  AlertSearchParams,
} from '~/services/alerts/types';
import { User } from '~/services/users/types';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { Action } from '~/services/actions/types';

/** SearchQueryState shape of the AlertList reducer. */
export interface AlertViewState {
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
  /** Current list of users. */
  users: User[];
  /** List of distilleries that have alerts associated with them. */
  distilleries: DistilleryMinimal[];
  /** Current list of actions that can be performed on an alert. */
  actions: Action[];
}

/**
 * Initial state of the AlertList reducer.
 * @type {State}
 */
const INITIAL_STATE: AlertViewState = {
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
  actions: [],
  distilleries: [],
  users: [],
};

/**
 * Mapped reducer functions that make up the AlertList AlertDetailReducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<AlertViewState, any> = {};

/**
 * Fields to update when the alert detail is updated.
 * @type {string[]}
 */
const ALERT_UPDATE_FIELDS = ['level', 'status', 'assigned_user'];

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_PENDING action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_PENDING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_PENDING] = (
  state: AlertViewState,
  action: ReduxAction<actions.SearchAlertsPendingPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
    loading: true,
    params: action.payload.params,
    polling: false,
    pollingEnabled: action.payload.poll,
    promiseId: action.payload.promiseId,
  };

  // Cancel the timeout for polling alerts.
  if (state.timeout) { window.clearTimeout(state.timeout); }

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_SUCCESS] = (
  state: AlertViewState,
  action: ReduxAction<actions.SearchAlertsSuccessPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
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
  state: AlertViewState,
  action: ReduxAction<actions.SearchAlertsFailurePayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
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
  state: AlertViewState,
  action: ReduxAction<actions.PollAlertsPendingPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
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
  state: AlertViewState,
  action: ReduxAction<actions.PollAlertsSuccessPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
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
  state: AlertViewState,
  action: ReduxAction<actions.PollAlertsFailurePayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
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
  state: AlertViewState,
  action: ReduxAction<actions.PollAlertsWaitPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
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
  state: AlertViewState,
  action: ReduxAction<actions.StopPollingPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
    polling: false,
    timeout: null,
  };

  if (state.timeout) { window.clearTimeout(state.timeout); }

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) DISABLE_POLLING action.
 * @param state Current AlertList reducer state.
 * @param action DISABLE_POLLING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.DISABLE_POLLING] = (
  state: AlertViewState,
  action: ReduxAction<actions.DisablePollingPayload>,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
    polling: false,
    pollingEnabled: false,
    timeout: null,
  };

  if (state.timeout) { window.clearTimeout(state.timeout); }

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) UPDATE_ALERT_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action UPDATE_ALERT_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[UPDATE_ALERT_SUCCESS] = (
  state: AlertViewState,
  action: ReduxAction<UpdateAlertSuccessPayload>,
): AlertViewState => {
  // Find array index of alert.
  const alertIndex = _.findIndex(
    state.alerts,
    (alert: AlertListItem) => alert.id === action.payload.id,
  );

  // If no index, return the current state.
  if (alertIndex === -1) { return state; }

  // Copy alert array.
  const copiedAlerts = state.alerts.slice();
  // Take out only the fields to update.
  const fields = _.pick(action.payload, ALERT_UPDATE_FIELDS);

  // Assign new fields to alert object and place at the array index.
  copiedAlerts[alertIndex] = Object.assign(
    {},
    copiedAlerts[alertIndex],
    fields,
  );

  // Type check state update.
  const update: Partial<AlertViewState> = { alerts: copiedAlerts };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n)  action.
 * @param state Current AlertList reducer state.
 * @param action  action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.FETCH_VIEW_RESOURCES_SUCCESS] = (
  state: AlertViewState,
  action: actions.FetchViewResourcesSuccessAction,
): AlertViewState => {
  const update: Partial<AlertViewState> = {
    actions: action.payload.actions,
    distilleries: action.payload.distilleries,
    users: action.payload.users,
  };

  return _.assign({}, state, update);
};

/**
 * AlertList reducer.
 * @type {Reducer<State, any>}
 */
export const AlertViewReducer = handleActions<AlertViewState, any>(
  reducers,
  INITIAL_STATE,
);
