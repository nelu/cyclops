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
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '~/types/redux';
import {
  DistilleryNested,
  NormalizedDistilleryList,
} from '~/services/distilleries/types';
import { normalizeDistilleries } from '~/services/distilleries/utils/distilleryNormalizr';
import { fetchAllDistilleries } from '~/services/distilleries/utils/distilleryAPI';
import { addError } from '~/routes/App/actions/ErroPopupActions';

/**
 * Action type prefix for search route resources actions.
 * @type {string}
 */
const ACTION_PREFIX = 'SEARCH_ROUTE_RESOURCES';

// --------------------------------------------------------------------------
// FETCH_DISTILLERIES_SUCCESS
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a request for all the current distilleries is
 * successful.
 * @type {string}
 */
export const FETCH_DISTILLERIES_SUCCESS = `${ACTION_PREFIX}/FETCH_DISTILLERIES_SUCCESS`;

/** FETCH_DISTILLERIES_SUCCESS payload type. */
export type FetchDistilleriesSuccessPayload = NormalizedDistilleryList;

/** FETCH_DISTILLERIES_SUCCESS action type. */
export type FetchDistilleriesSuccessAction = ReduxAction<FetchDistilleriesSuccessPayload>;

/**
 * Creates a(n) FETCH_DISTILLERIES_SUCCESS action.
 * @returns {FetchDistilleriesSuccessAction}
 */
export function fetchDistilleriesSuccess(
  distilleries: DistilleryNested[],
): FetchDistilleriesSuccessAction {
  return {
    type: FETCH_DISTILLERIES_SUCCESS,
    payload: normalizeDistilleries(distilleries),
  };
}

// --------------------------------------------------------------------------
// FETCH_DISTILLERIES_FAILURE
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a request for all the current distilleries is
 * not successful.
 * @type {string}
 */
export const FETCH_DISTILLERIES_FAILURE = `${ACTION_PREFIX}/FETCH_DISTILLERIES_FAILURE`;

/** FETCH_DISTILLERIES_FAILURE payload type. */
export type FetchDistilleriesFailurePayload = undefined;

/** FETCH_DISTILLERIES_FAILURE action type. */
export type FetchDistilleriesFailureAction = ReduxAction<FetchDistilleriesFailurePayload>;

/**
 * Creates a(n) FETCH_DISTILLERIES_FAILURE action.
 * @returns {FetchDistilleriesFailureAction}
 */
export function fetchDistilleriesFailure(): FetchDistilleriesFailureAction {
  return {
    type: FETCH_DISTILLERIES_FAILURE,
    payload: undefined,
  };
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetches all the current distilleries.
 * @returns {ThunkActionPromise}
 */
export function fetchDistilleries(): ThunkActionPromise {
  return (dispatch) => {
    return fetchAllDistilleries()
      .then((distilleries) => {
        dispatch(fetchDistilleriesSuccess(distilleries));
      })
      .catch((error) => {
        dispatch(fetchDistilleriesFailure());
        dispatch(addError(error));
      });
  };
}
