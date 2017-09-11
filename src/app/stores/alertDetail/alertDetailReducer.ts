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
import { LocationFieldAddress, Markers } from '~/services/map/types';
import { AlertDetail } from '~/services/alerts/types';
import * as actions from './alertDetailActions';
import { ResultIPAdresses } from '~/types/result';
import { createReducer, updateState } from '~/utils/reduxUtils';

/** State shape of the alertDetail reducer. */
export interface AlertDetailState {
  alertID?: number;
  promiseID: symbol;
  locations: LocationFieldAddress[];
  markers?: Markers;
  alert?: AlertDetail;
  isLoading: boolean;
  errors: string[];
}

/**
 * Reducer containing detailed information on a specific alert.
 * @type {Reducer<AlertDetailState>}
 */
export const alertDetail = createReducer<AlertDetailState>({
  locations: [],
  isLoading: false,
  errors: [],
  promiseID: Symbol(),
}, {
  [actions.FETCH_ALERT_PENDING]: (
    state: AlertDetailState,
    action: actions.FetchAlertPendingAction,
  ) => updateState(state, {
    promiseID: action.payload.promiseID,
    alertID: action.payload.alertID,
  }),

  [actions.FETCH_ALERT_SUCCESS]: (
    state: AlertDetailState,
    action: actions.FetchAlertSuccessAction,
  ) => updateState(state, {

  }),

  [actions.FETCH_ALERT_FAILED]: (
    state: AlertDetailState,
    action: actions.FetchAlertFailedAction,
  ) => updateState(state, {
    isLoading: false,
  }),


});
