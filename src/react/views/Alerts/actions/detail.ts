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
import axios, { Canceler } from 'axios';
import * as _ from 'lodash';

// Local
import {
  ReduxAction,
  ThunkActionPromise,
  ReduxDispatch,
} from '../../../types/redux';
import { createAction } from '../../../utils/createReduxAction';
import {
  AlertDetail,
  AlertUpdateFields,
} from '../../../api/alerts/types';
import { getCancelTokenSource } from '../../../api/utils';
import {
  fetchAlert,
  updateAlert,
  performAction,
  addComment,
} from '../../../api/alerts/api';
import { addError } from '../../App/actions/errorPopup';
import { getLocationsWithAddress } from '../../../services/map/utils/getLocationsWithAddress';
import { createLocationGeoJSON } from '../../../services/map/utils/createLocationGeoJSON';
import {
  LocationFieldAddress,
  Markers,
} from '../../../services/map/types';
import {
  Result,
  ResultIPAdresses,
} from '../../../types/result';
import { Container } from '../../../api/containers/types';
import { getFieldsOfType } from '../../../api/containers/utils';
import { CONTAINER_FIELDS } from '../../../api/containers/schemas';
import { Dictionary } from '../../../types/object';

// --------------------------------------------------------------------------
// Helper Functions/Variables
// --------------------------------------------------------------------------

/**
 * Creates a function that handles an error from an API request for alert
 * detail actions.
 * @param dispatch
 * @returns {(error:any)=>void}
 */
function handleError(dispatch: ReduxDispatch) {
  return (error: any): void => {
    if (axios.isCancel(error)) return;

    dispatch(requestFailed());
    dispatch(addError(error));
  };
}

/**
 * Creates a function that takes an alert and updates the alert detail with
 * that alert.
 * @param dispatch
 * @returns {(alert:AlertDetail)=>void}
 */
function updateAlertDetailObject(dispatch: ReduxDispatch) {
  return (alert: AlertDetail): void => {
    dispatch(updateAlertSuccess(alert));
  };
}

/**
 * Prefix for all the action types in this module.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_DETAIL';

// --------------------------------------------------------------------------
// CLOSE_ALERT
// --------------------------------------------------------------------------

/**
 * Action Type: When the alerts detail is closed.
 * @type {string}
 */
export const CLOSE_ALERT = `${ACTION_PREFIX}/CLOSE_ALERT`;

/** CLOSE_ALERT payload type. */
export type CloseAlertPayload = undefined;

/** CLOSE_ALERT action type. */
export type CloseAlertAction = ReduxAction<CloseAlertPayload>;

/**
 * Creates a CLOSE_ALERT action.
 * @returns {ReduxAction<CloseAlertPayload>}
 */
export function closeAlert(): CloseAlertAction {
  return createAction(CLOSE_ALERT, undefined);
}

// --------------------------------------------------------------------------
// FETCH_ALERT_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for an alerts object for the alerts detail
 * is made.
 * @type {string}
 */
export const FETCH_ALERT_PENDING = `${ACTION_PREFIX}/FETCH_ALERT_PENDING`;

/** FETCH_ALERT_PENDING payload type. */
export interface FetchAlertPendingPayload {
  alertId: number;
  canceler: Canceler;
}

/** FETCH_ALERT_PENDING action type. */
export type FetchAlertPendingAction = ReduxAction<FetchAlertPendingPayload>;

/**
 * Creates a FETCH_ALERT_PENDING action and cancels any other requests
 * that have been made prior to this action.
 * @param alertId ID of the alerts being fetched.
 * @param canceler Function that cancels the promise making the request.
 * @returns {ReduxAction<{alertId: number, canceler: Canceler}>}
 */
export function fetchAlertPending(alertId: number, canceler: Canceler):
  FetchAlertPendingAction {
  return createAction(FETCH_ALERT_PENDING, { alertId, canceler });
}

// --------------------------------------------------------------------------
// FETCH_ALERT_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for an alert object is successful.
 * @type {string}
 */
export const FETCH_ALERT_SUCCESS = `${ACTION_PREFIX}/FETCH_ALERT_SUCCESS`;

/** FETCH_ALERT_SUCCESS payload type. */
export interface FetchAlertSuccessPayload {
  alert: AlertDetail;
  locations: LocationFieldAddress[];
  markers: Markers | null;
}

/** FETCH_ALERT_SUCCESS action type. */
export type FetchAlertSuccessAction = ReduxAction<FetchAlertSuccessPayload>;

/**
 * Creates a FETCH_ALERT_SUCCESS action.
 * @returns {Action<FetchAlertSuccessPayload>;
 */
export function fetchAlertSuccess(
  alert: AlertDetail,
  locations: LocationFieldAddress[],
  markers: Markers | null,
): FetchAlertSuccessAction {
  return createAction(FETCH_ALERT_SUCCESS, { alert, locations, markers });
}

// --------------------------------------------------------------------------
// REQUEST_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a request to the alert detail API is sent.
 * @type {string}
 */
export const REQUEST_PENDING = `${ACTION_PREFIX}/REQUEST_PENDING`;

/**
 * REQUEST_PENDING payload type.
 */
export type RequestPendingPayload = Canceler;

/**
 * REQUEST_PENDING action type.
 */
export type RequestPendingAction = ReduxAction<RequestPendingPayload>;

/**
 * Creates a REQUEST_PENDING action.
 * @returns {Action<RequestPendingPayload>;
 */
export function requestPending(canceler: Canceler): RequestPendingAction {
  return createAction(REQUEST_PENDING, canceler);
}

// --------------------------------------------------------------------------
// UPDATE_ALERT_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When the alerts in the alerts detail is updated successfully.
 * @type {string}
 */
export const UPDATE_ALERT_SUCCESS = `${ACTION_PREFIX}/UPDATE_ALERT_SUCCESS`;

/**
 * UPDATE_ALERT_SUCCESS payload type.
 */
export type UpdateAlertSuccessPayload = AlertDetail;

/**
 * UPDATE_ALERT_SUCCESS action type.
 */
export type UpdateAlertSuccessAction = ReduxAction<UpdateAlertSuccessPayload>;

/**
 * Creates a UPDATE_ALERT_SUCCESS action.
 * @param alert
 * @returns {ReduxAction<AlertDetail>}
 */
export function updateAlertSuccess(
  alert: AlertDetail,
): UpdateAlertSuccessAction {
  return createAction(UPDATE_ALERT_SUCCESS, alert);
}

// --------------------------------------------------------------------------
// REQUEST_FAILED
// --------------------------------------------------------------------------

/**
 * Action Type: When any request made to the alert detail api fails.
 * @type {string}
 */
export const REQUEST_FAILED = `${ACTION_PREFIX}/REQUEST_FAILED`;

/**
 * REQUEST_FAILED payload type.
 */
export type RequestFailedPayload = undefined;

/**
 * REQUEST_FAILED action type.
 */
export type RequestFailedAction = ReduxAction<RequestFailedPayload>;

/**
 * Creates a REQUEST_FAILED action.
 * @returns {Action<RequestFailedPayload>;
 */
export function requestFailed(): RequestFailedAction {
  return createAction(REQUEST_FAILED, undefined);
}

// --------------------------------------------------------------------------
// OPEN_DATA_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When a modal is opened to analyze the alert detail data.
 * @type {string}
 */
export const OPEN_DATA_MODAL = `${ACTION_PREFIX}/OPEN_DATA_MODAL`;

/**
 * OPEN_DATA_MODAL payload type.
 */
export type OpenDataModalPayload = ResultIPAdresses | null;

/**
 * OPEN_DATA_MODAL action type.
 */
export type OpenDataModalAction = ReduxAction<OpenDataModalPayload>;

/**
 * Creates a OPEN_DATA_MODAL action.
 * @returns {Action<OpenDataModalPayload>;
 */
export function openDataModal(
  data: Result,
  container: Container,
): OpenDataModalAction {
  const ipAddresses = getFieldsOfType<string>(
    CONTAINER_FIELDS.IP_ADDRESS, container, data,
  );

  if (!ipAddresses) return createAction(OPEN_DATA_MODAL, null);

  const nonNullIPS: Dictionary<string> = {};

  _.forEach(ipAddresses, (value: string | null, key: string) => {
    if (value !== null) nonNullIPS[key] = value;
  });

  if (_.isEmpty(nonNullIPS)) return createAction(OPEN_DATA_MODAL, null);

  return createAction(OPEN_DATA_MODAL, ipAddresses || null);
}

// --------------------------------------------------------------------------
// CLOSE_DATA_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When a modal display the alert data is closed.
 * @type {string}
 */
export const CLOSE_DATA_MODAL = `${ACTION_PREFIX}/CLOSE_DATA_MODAL`;

/**
 * CLOSE_DATA_MODAL payload type.
 */
export type CloseDataModalPayload = undefined;

/**
 * CLOSE_DATA_MODAL action type.
 */
export type CloseDataModalAction = ReduxAction<CloseDataModalPayload>;

/**
 * Creates a CLOSE_DATA_MODAL action.
 * @returns {Action<CloseDataModalPayload>;
 */
export function closeDataModal(): CloseDataModalAction {
  return createAction(CLOSE_DATA_MODAL, undefined);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetchs an alert object for the alert detail view.
 * @returns {ThunkActionPromise}
 */
export function fetchAlertDetail(alertId: number): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();
    let nestedAlert: AlertDetail;

    dispatch(fetchAlertPending(alertId, source.cancel));

    return fetchAlert(alertId, source.token)
      .then((alert) => {
        nestedAlert = alert;

        return getLocationsWithAddress(
          alert.distillery.container,
          alert.data,
          source.token,
        );
      })
      .then((locations) => {
        const markers = locations.length ?
          createLocationGeoJSON(locations) : null;

        dispatch(fetchAlertSuccess(nestedAlert, locations, markers));
      })
      .catch(handleError(dispatch));
  };
}

/**
 * Updates the alert detail object with new fields.
 * @param alertId ID of the alert to update.
 * @param fields Fields to update the alert with.
 * @returns {ThunkActionPromise}
 */
export function updateAlertDetail(
  alertId: number,
  fields: AlertUpdateFields,
): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(requestPending(source.cancel));

    return updateAlert(alertId, fields, source.token)
      .then(updateAlertDetailObject(dispatch))
      .catch(handleError(dispatch));
  };
}

/**
 * Performs an action on the alert in the alert detail and then updates
 * the alert detail object.
 * @param alertId ID of the alert to perform the action on.
 * @param actionId ID of the action to perform.
 * @returns {ThunkActionPromise}
 */
export function performAlertDetailAction(
  alertId: number,
  actionId: number,
): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(requestPending(source.cancel));

    return performAction(alertId, actionId, source.token)
      .then(updateAlertDetailObject(dispatch))
      .catch(handleError(dispatch));
  };
}

/**
 * Adds a new comment to the alert detail object.
 * @param alertId ID of the alert to add the comment to
 * @param comment Content of the comment.
 * @returns {ThunkActionPromise}
 */
export function addAlertDetailComment(
  alertId: number,
  comment: string,
): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(requestPending(source.cancel));

    return addComment(alertId, comment, source.token)
      .then(updateAlertDetailObject(dispatch))
      .catch(handleError(dispatch));
  };
}
