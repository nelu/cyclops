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

// Local
import { createAction } from '../../../utils/createReduxAction';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid
} from '../../../types/redux';
import {
  MonitorNested,
  NormalizedMonitorList,
} from '../../../api/monitors/types';
import {
  sortMonitorsByStatus,
  normalizeMonitors,
} from '../../../api/monitors/utils';
import { fetchMonitorList } from '../../../api/monitors/api';
import { addError } from './errorPopup';

/**
 * Action type prefix for MonitorStatus actions.
 * @type {string}
 */
const ACTION_PREFIX = 'MONITOR_STATUS';

// --------------------------------------------------------------------------
// FETCH_MONITORS_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a current list of monitor objects is requested.
 * @type {string}
 */
export const FETCH_MONITORS_PENDING = `${ACTION_PREFIX}/FETCH_MONITORS_PENDING`;

/**
 * FETCH_MONITORS_PENDING payload type.
 */
export type FetchMonitorsPendingPayload = undefined;

/**
 * FETCH_MONITORS_PENDING action type.
 */
export type FetchMonitorsPendingAction = ReduxAction<FetchMonitorsPendingPayload>;

/**
 * Creates a FETCH_MONITORS_PENDING action.
 * @returns {Action<FetchMonitorsPendingPayload>;
 */
export function fetchMonitorsPending(): FetchMonitorsPendingAction {
  return createAction(FETCH_MONITORS_PENDING, undefined);
}

// --------------------------------------------------------------------------
// FETCH_MONITORS_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for a current list of monitor objects
 * is successful.
 * @type {string}
 */
export const FETCH_MONITORS_SUCCESS = `${ACTION_PREFIX}/FETCH_MONITORS_SUCCESS`;

/**
 * FETCH_MONITORS_SUCCESS payload type.
 */
export interface FetchMonitorsSuccessPayload {
  monitors: NormalizedMonitorList;
  monitorsUp: string[];
  monitorsDown: string[];
}

/**
 * FETCH_MONITORS_SUCCESS action type.
 */
export type FetchMonitorsSuccessAction = ReduxAction<FetchMonitorsSuccessPayload>;

/**
 * Creates a FETCH_MONITORS_SUCCESS action.
 * @returns {Action<FetchMonitorsSuccessPayload>;
 */
export function fetchMonitorsSuccess(
  monitors: MonitorNested[],
): FetchMonitorsSuccessAction {
  const sortedMonitorsByStatus = sortMonitorsByStatus(monitors);
  const monitorsUp = sortedMonitorsByStatus.up;
  const monitorsDown = sortedMonitorsByStatus.down;
  const normalizedMonitors = normalizeMonitors(monitors);

  return createAction<FetchMonitorsSuccessPayload>(FETCH_MONITORS_SUCCESS, {
    monitors: normalizedMonitors,
    monitorsUp,
    monitorsDown,
  });
}

// --------------------------------------------------------------------------
// SELECT_MONITOR
// --------------------------------------------------------------------------

/**
 * Action Type: When a monitor is selected to view detailed information on.
 * @type {string}
 */
export const SELECT_MONITOR = `${ACTION_PREFIX}/SELECT_MONITOR`;

/**
 * SELECT_MONITOR payload type.
 */
export type SelectMonitorPayload = string;

/**
 * SELECT_MONITOR action type.
 */
export type SelectMonitorAction = ReduxAction<SelectMonitorPayload>;

/**
 * Creates a SELECT_MONITOR action.
 * @param monitor Monitor name to select.
 * @returns {ReduxAction<string>}
 */
export function selectMonitor(monitor: string): SelectMonitorAction {
  return createAction(SELECT_MONITOR, monitor);
}

// --------------------------------------------------------------------------
// OPEN_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When the monitor status modal is opened.
 * @type {string}
 */
export const OPEN_MODAL = `${ACTION_PREFIX}/OPEN_MODAL`;

/**
 * OPEN_MODAL payload type.
 */
export type OpenModalPayload = undefined;

/**
 * OPEN_MODAL action type.
 */
export type OpenModalAction = ReduxAction<OpenModalPayload>;

/**
 * Signifies that the monitor status modal should open and that it should
 * fetch a new list of monitors.
 * @returns {ThunkActionPromise}
 */
export function openModal(): ThunkActionVoid {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL });
    dispatch(fetchMonitors());
  };
}

// --------------------------------------------------------------------------
// CLOSE_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When the monitor status modal is closed.
 * @type {string}
 */
export const CLOSE_MODAL = `${ACTION_PREFIX}/CLOSE_MODAL`;

/**
 * CLOSE_MODAL payload type.
 */
export type CloseModalPayload = undefined;

/**
 * CLOSE_MODAL action type.
 */
export type CloseModalAction = ReduxAction<CloseModalPayload>;

/**
 * Creates a CLOSE_MODAL action.
 * @returns {Action<CloseModalPayload>;
 */
export function closeModal(): CloseModalAction {
  return createAction(CLOSE_MODAL, undefined);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetches a current list of monitor objects and signifies that the objects
 * were received or failed.
 * @returns {ThunkActionPromise}
 */
export function fetchMonitors(): ThunkActionPromise {
  return (dispatch) => {
    dispatch(fetchMonitorsPending());

    return fetchMonitorList()
      .then((response) => {
        dispatch(fetchMonitorsSuccess(response.results));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
