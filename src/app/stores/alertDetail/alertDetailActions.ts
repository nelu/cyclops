import {
  ReduxAction,
  SimpleReduxAction,
} from '~/types/redux';
import { ThunkActionPromise } from '../types';
import {
  AlertDetail,
  AlertUpdateRequest,
} from '~/services/alerts/types';
import * as alertAPI from '~/services/alerts/utils/alertsAPI';
import { getLocationsWithAddress } from '~/services/map/utils/getLocationsWithAddress';
import { LocationFieldAddress, Markers } from '~/services/map/types';
import { createLocationGeoJSON } from '~/services/map/utils/createLocationGeoJSON';
import { addError } from '~/stores/error/errorActions';
import { checkAlertUpdate } from '~/services/alerts/utils/checkAlertUpdate';
import { addErrorMessage } from '~/routes/AlertDetail/actions/AlertDetailActions';
import { modifyAlertUpdate } from '~/services/alerts/utils/modifyAlertUpdate';
import { RootState } from '~/stores';

const ACTION_PREFIX = 'ALERT_DETAIL';

function isValidPromiseID(promiseID: symbol, state: RootState): boolean {
  return state.alertDetail.promiseID === promiseID;
}

// -- CLOSE_ALERT_DETAIL --
// User wants to close the current alert detail view.

export const CLOSE_ALERT_DETAIL = `${ACTION_PREFIX}/CLOSE_ALERT_DETAIL`;
export type CloseAlertAction = SimpleReduxAction;
export const closeAlert = (): CloseAlertAction => ({ type: CLOSE_ALERT_DETAIL });

// -- FETCH_ALERT_PENDING --
// Request has been sent for more detailed information on a specific alert.

export const FETCH_ALERT_PENDING = `${ACTION_PREFIX}/FETCH_ALERT_PENDING`;
export type FetchAlertPendingAction = ReduxAction<{
  alertID: number;
  promiseID: symbol;
}>;
export const fetchAlertPending = (
  alertID: number,
  promiseID: symbol,
): FetchAlertPendingAction => ({
  type: FETCH_ALERT_PENDING,
  payload: { alertID, promiseID },
});

// -- FETCH_ALERT_SUCCESS --
// Request for more detailed information on a specific alert is successful.

export const FETCH_ALERT_SUCCESS = `${ACTION_PREFIX}/FETCH_ALERT_SUCCESS`;
export type FetchAlertSuccessAction = ReduxAction<{
  alert: AlertDetail,
  promiseID: symbol,
}>;
export const fetchAlertSuccess = (
  alert: AlertDetail,
  promiseID: symbol,
): FetchAlertSuccessAction => ({
  type: FETCH_ALERT_SUCCESS,
  payload: { alert, promiseID },
});

export const FETCH_ALERT_FAILED = `${ACTION_PREFIX}/FETCH_ALERT_FAILED`;
export type FetchAlertFailedAction = ReduxAction<undefined>;
export function fetchAlertFailed(): FetchAlertFailedAction {
  return { type: FETCH_ALERT_FAILED, payload: undefined };
}

export function fetchAlertDetail(alertID: number): ThunkActionPromise {
  return (dispatch, getState) => {
    const promiseID = Symbol();

    dispatch(fetchAlertPending(alertID, promiseID));

    return alertAPI.fetchAlert(alertID)
      .then((alert) => {
        if (!isValidPromiseID(promiseID, getState())) { return; }

        dispatch(fetchAlertSuccess(alert, promiseID));

        if (alert.distillery && alert.data) {
          return dispatch(fetchAlertLocations(alert, promiseID));
        }
      })
      .catch((error) => {
        dispatch(addError(error));

        if (!isValidPromiseID(promiseID, getState())) {
          dispatch(fetchAlertFailed());
        }
      });
  };
}

// ---------------------------------------------------------------------------

export const FETCH_ALERT_LOCATIONS_SUCCESS = (
  `${ACTION_PREFIX}/FETCH_ALERT_LOCATIONS_SUCCESS`
);
export type FetchAlertLocationsSuccessAction = ReduxAction<{
  locations: LocationFieldAddress[];
  markers?: Markers;
  promiseID: symbol;
}>;
export const fetchAlertLocationsSuccess = (
  locations: LocationFieldAddress[],
  promiseID: symbol,
): FetchAlertLocationsSuccessAction => ({
  type: FETCH_ALERT_LOCATIONS_SUCCESS,
  payload: {
    markers: locations.length ? createLocationGeoJSON(locations) : undefined,
    locations,
    promiseID,
  },
});

export function fetchAlertLocations(
  alert: AlertDetail,
  promiseID: symbol,
): ThunkActionPromise {
  return (dispatch, getState) => {
    if (!isValidPromiseID(promiseID, getState())) { return Promise.resolve(); }
    if (!alert.distillery || !alert.data) { return Promise.reject(''); }

    return getLocationsWithAddress(alert.distillery.container, alert.data)
      .then((locations) => {
        if (!isValidPromiseID(promiseID, getState())) { return; }

        dispatch(fetchAlertLocationsSuccess(locations, promiseID));
      })
      .catch((error) => {
        dispatch(addError(error));

        if (!isValidPromiseID(promiseID, getState())) {}
      });
  };
}

export const ADD_ALERT_ERROR = `${ACTION_PREFIX}/ADD_ALERT_ERROR`;
export type AddAlertErrorAction = ReduxAction<string[]>;
export function addAlertError(messages: string[]): AddAlertErrorAction {
  return { type: ADD_ALERT_ERROR, payload: messages };
}

export const UPDATE_ALERT_PENDING = `${ACTION_PREFIX}/UPDATE_ALERT_PENDING`;
export type UpdateAlertPendingAction = ReduxAction<symbol>;
export function updateAlertPending(promiseID: symbol): UpdateAlertPendingAction {
  return { type: UPDATE_ALERT_PENDING, payload: promiseID };
}

export function updateAlert(
  alert: AlertDetail,
  fields: AlertUpdateRequest,
): ThunkActionPromise {
  return (dispatch) => {
    const request = checkAlertUpdate(alert, fields);

    if (!request.valid) {
      dispatch(addErrorMessage(request.errors));

      return Promise.reject('Alert update request invalid.');
    }

    const modifiedUpdate = modifyAlertUpdate(alert, fields);
    const promiseID = Symbol();

    dispatch(updateAlertPending(promiseID));

    return alertAPI.updateAlert(alert.id, modifiedUpdate)
      .then((update) => {

      });
  };
}
