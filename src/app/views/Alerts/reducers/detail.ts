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
  handleActions,
  ReducerMap,
} from 'redux-actions';
import * as _ from 'lodash';

// Local
import {
  LocationFieldAddress,
  Markers,
} from '../../../services/map/types';
import { AlertDetail } from '../../../api/alerts/types';
import * as actions from '../actions/detail';
import { Canceler } from 'axios';
import { ResultIPAdresses } from '../../../types/result';

/** State shape of the AlertDetail reducer. */
export interface State {
  /** ID of the currently selected alerts. */
  alertId: number | null;
  /** Locations from the alerts data with their addresses. */
  locations: LocationFieldAddress[];
  /** GeoJSON markers of the currently selected alerts. */
  markers: Markers | null;
  /** Currently selected alerts. */
  alert: AlertDetail | null;
  /** If a loading icon should be shown. */
  loading: boolean;
  /** IP address fields related to the alert. */
  ipAddresses: ResultIPAdresses | null;
  /** If the data modal is active. */
  modalActive: boolean;
}

/**
 * Initial state of the AlertDetail reducer.
 * @type {State}
 */
const INITIAL_STATE: State = {
  alert: null,
  alertId: null,
  ipAddresses: null,
  loading: false,
  locations: [],
  markers: null,
  modalActive: false,
};

const reducers: ReducerMap<State, any> = {};

/**
 * Function that cancels a pending request.
 */
let requestCanceler: Canceler;

/**
 * Cancels a pending request related to the alert detail view and replaces
 * the requestCanceler function with a new one.
 * @param canceler Function that cancels a request.
 */
function cancelRequest(canceler?: Canceler): void {
  if (requestCanceler) { requestCanceler(); }
  if (canceler) { requestCanceler = canceler; }
}

/**
 * Updates the AlertDetail reducer based on a(n) CLOSE_ALERT action.
 * @param state Current AlertDetail reducer state.
 * @param action CLOSE_ALERT action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.CLOSE_ALERT] = (
  state: State,
  action: actions.CloseAlertAction,
): State => {
  cancelRequest();

  return _.assign({}, state, INITIAL_STATE);
};

/**
 * Updates the AlertDetail reducer based on a(n) FETCH_ALERT_PENDING action.
 * @param state Current AlertDetail reducer state.
 * @param action FETCH_ALERT_PENDING action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.FETCH_ALERT_PENDING] = (
  state: State,
  action: actions.FetchAlertPendingAction,
): State => {
  const update: Partial<State> = {
    alertId: action.payload.alertId,
    loading: true,
  };

  cancelRequest(action.payload.canceler);

  return _.assign({}, state, update);
};

/**
 * Updates the AlertDetail reducer based on a(n) FETCH_ALERT_SUCCESS action.
 * @param state Current AlertDetail reducer state.
 * @param action FETCH_ALERT_SUCCESS action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.FETCH_ALERT_SUCCESS] = (
  state: State,
  action: actions.FetchAlertSuccessAction,
): State => {
  const update: Partial<State> = {
    alert: action.payload.alert,
    loading: false,
    locations: action.payload.locations,
    markers: action.payload.markers,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the AlertDetail reducer based on a(n) REQUEST_PENDING action.
 * @param state Current AlertDetail reducer state.
 * @param action REQUEST_PENDING action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.REQUEST_PENDING] = (
  state: State,
  action: actions.RequestPendingAction,
): State => {
  const update: Partial<State> = {
    loading: true,
  };

  // Cancel any pending requests that haven't returned.
  cancelRequest(action.payload);

  return _.assign({}, state, update);
};

/**
 * Updates the AlertDetail reducer based on a(n) REQUEST_FAILED action.
 * @param state Current AlertDetail reducer state.
 * @param action REQUEST_FAILED action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.REQUEST_FAILED] = (
  state: State,
  action: actions.RequestFailedAction,
): State => {
  const update: Partial<State> = {
    loading: false,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the AlertDetail reducer based on a(n) UPDATE_ALERT_SUCCESS action.
 * @param state Current AlertDetail reducer state.
 * @param action UPDATE_ALERT_SUCCESS action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.UPDATE_ALERT_SUCCESS] = (
  state: State,
  action: actions.UpdateAlertSuccessAction,
): State => {
  const update: Partial<State> = {
    alert: _.assign({}, state.alert, action.payload),
    loading: false,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the AlertDetail reducer based on a(n) OPEN_DATA_MODAL action.
 * @param state Current AlertDetail reducer state.
 * @param action OPEN_DATA_MODAL action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.OPEN_DATA_MODAL] = (
  state: State,
  action: actions.OpenDataModalAction,
): State => {
  const update: Partial<State> = {
    ipAddresses: action.payload,
    modalActive: true,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the AlertDetail reducer based on a(n) CLOSE_DATA_MODAL action.
 * @param state Current AlertDetail reducer state.
 * @param action CLOSE_DATA_MODAL action.
 * @returns {State} Updated AlertDetail reducer state.
 */
reducers[actions.CLOSE_DATA_MODAL] = (
  state: State,
  action: actions.CloseDataModalAction,
): State => {
  const update: Partial<State> = {
    modalActive: false,
  };

  return _.assign({}, state, update);
};

/**
 * Reducer for the alert detail view.
 * @type {Reducer<State, any>}
 */
export const reducer = handleActions<State, any>(reducers, INITIAL_STATE);