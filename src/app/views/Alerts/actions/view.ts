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
import axios from 'axios';

// Local
import { createAction } from '../../../utils/createReduxAction';
import {
  ReduxAction,
  ThunkActionPromise,
} from '../../../types/redux';
import { User } from '../../../api/users/types';
import { fetchAllUsers } from '../../../api/users/api';
import { fetchAllActions } from '../../../api/actions/api';
import { Action } from '../../../api/actions/types';
import { fetchAllAlertDistilleries } from '../../../api/distilleries/api';
import { DistilleryFlat } from '../../../api/distilleries/types';

/**
 * Action type prefix for AlertView actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_VIEW';

// --------------------------------------------------------------------------
// FETCH_VIEW_RESOURCES_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type:
 * @type {string}
 */
export const FETCH_VIEW_RESOURCES_SUCCESS =
  `${ACTION_PREFIX}/FETCH_VIEW_RESOURCES_SUCCESS`;

/** FETCH_VIEW_RESOURCES_SUCCESS payload type. */
export interface FetchViewResourcesSuccessPayload {
  users: User[];
  actions: Action[];
  distilleries: DistilleryFlat[];
}

/** FETCH_VIEW_RESOURCES_SUCCESS action type. */
export type FetchViewResourcesSuccessAction = ReduxAction<
  FetchViewResourcesSuccessPayload
>;

/**
 * Creates a FETCH_VIEW_RESOURCES_SUCCESS action.
 * @returns {ReduxAction<Payload>;
 */
export function fetchViewResourcesSuccess(
  users: User[],
  actions: Action[],
  distilleries: DistilleryFlat[],
): FetchViewResourcesSuccessAction {
  return createAction(
    FETCH_VIEW_RESOURCES_SUCCESS,
    { users, actions, distilleries },
  );
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetches the resources for the alert view.
 * @returns {ThunkActionPromise}
 */
export function fetchViewResources(): ThunkActionPromise {
  return (dispatch) => {
    const promises = [
      fetchAllUsers(),
      fetchAllActions(),
      fetchAllAlertDistilleries(),
    ];
    const spread = axios.spread<any, any>((
      users: User[],
      actions: Action[],
      distilleries: DistilleryFlat[],
    ) => {
      dispatch(fetchViewResourcesSuccess(users, actions, distilleries));
    });

    return axios.all<any>(promises)
      .then(spread);
  };
}
