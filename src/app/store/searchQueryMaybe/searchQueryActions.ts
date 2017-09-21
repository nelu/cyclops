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
import { createAction } from '~/utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '~/store/types';
import * as searchAPI from '~/services/search/utils/searchAPI';
import {
  AlertSearchResults,
  CombinedSearchResults,
  DistillerySearchResults,
  SearchEndpoint,
  SearchQuery,
} from '~/services/search/types';
import { addError } from '~/store/errorModal';

const ACTION_PREFIX = 'SEARCH_QUERY';

// -- GENERAL_QUERY_PENDING --
// General query has been sent to the search endpoint.

export const GENERAL_QUERY_PENDING = `${ACTION_PREFIX}/GENERAL_QUERY_PENDING`;
export type GeneralQueryPendingAction = ReduxAction<undefined>;
export function generalQueryPending(): GeneralQueryPendingAction {
  return { type: GENERAL_QUERY_PENDING, payload: undefined };
}

// -- GENERAL_QUERY_SUCCESS --
// General query send to the search endpoint was successful.

export const GENERAL_QUERY_SUCCESS = `${ACTION_PREFIX}/GENERAL_QUERY_SUCCESS`;
export type GeneralQuerySuccessAction = ReduxAction<SearchEndpoint<CombinedSearchResults>>;
export function generalQuerySuccess(
  response: SearchEndpoint<CombinedSearchResults>,
): GeneralQuerySuccessAction {
  return { type: GENERAL_QUERY_SUCCESS, payload: response };
}

// -- GENERAL_QUERY_Failed --
// General query send to the search endpoint was unsuccessful.

export const GENERAL_QUERY_FAILED = `${ACTION_PREFIX}/GENERAL_QUERY_FAILED`;
export type GeneralQueryFailedAction = ReduxAction<SearchEndpoint<CombinedSearchResults>>;
export function generalQueryFailed(
  response: SearchEndpoint<CombinedSearchResults>,
): GeneralQueryFailedAction {
  return { type: GENERAL_QUERY_FAILED, payload: response };
}

// --------------------------------------------------------------------------
// ALERT_QUERY_SUCCESS
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a search query for alerts returns successfully.
 * @type {string}
 */
export const ALERT_QUERY_SUCCESS = `${ACTION_PREFIX}/ALERT_QUERY_SUCCESS`;

/** ALERT_QUERY_SUCCESS payload type. */
export type AlertQuerySuccessPayload = SearchEndpoint<AlertSearchResults>;

/** ALERT_QUERY_SUCCESS action type. */
export type AlertQuerySuccessAction = ReduxAction<AlertQuerySuccessPayload>;

/**
 * Creates a(n) ALERT_QUERY_SUCCESS action.
 * @returns {AlertQuerySuccessAction}
 */
export function alertQuerySuccess(
  response: SearchEndpoint<AlertSearchResults>,
): AlertQuerySuccessAction {
  return {
    type: ALERT_QUERY_SUCCESS,
    payload: response,
  };
}

// --------------------------------------------------------------------------
// DISTILLERY_QUERY_SUCCESS
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a serach query through distillery results returns
 * successfully.
 * @type {string}
 */
export const DISTILLERY_QUERY_SUCCESS = `${ACTION_PREFIX}/DISTILLERY_QUERY_SUCCESS`;

/** DISTILLERY_QUERY_SUCCESS payload type. */
export type DistilleryQuerySuccessPayload = SearchEndpoint<DistillerySearchResults>;

/** DISTILLERY_QUERY_SUCCESS action type. */
export type DistilleryQuerySuccessAction = ReduxAction<DistilleryQuerySuccessPayload>;

/**
 * Creates a(n) DISTILLERY_QUERY_SUCCESS action.
 * @returns {DistilleryQuerySuccessAction}
 */
export function distilleryQuerySuccess(
  response: SearchEndpoint<DistillerySearchResults>,
): DistilleryQuerySuccessAction {
  return {
    type: DISTILLERY_QUERY_SUCCESS,
    payload: response,
  };
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Sends a search query to the general search endpoint
 * @returns {ThunkActionPromise}
 */
export function search(query: string): ThunkActionPromise {
  return (dispatch) => {
    dispatch(generalQueryPending());

    return searchAPI.search(query).then((response) => {
      dispatch(generalQuerySuccess(response));
    }).catch((response) => {
      if (response.response.status === 400) {
        dispatch(generalQueryFailed(response.response.data));
      } else {
        dispatch(addError(response));
      }
    });
  };
}

/**
 * Searches for alerts based on a search query.
 * @param {string} query
 * @param {number} page Page number to return.
 * @returns {ThunkActionPromise}
 */
export function searchAlerts(query: string, page?: number): ThunkActionPromise {
  return (dispatch) => {
    dispatch(generalQueryPending());

    return searchAPI.searchAlerts(query, page).then((response) => {
      dispatch(alertQuerySuccess(response));
    }).catch((response) => {
      if (response.response.status === 400) {
        dispatch(generalQueryFailed(response.response.data));
      } else {
        dispatch(addError(response));
      }
    });
  };
}

/**
 * Searches a single distillery for stores matching a search query.
 * @param {number} id ID of the distillery to search.
 * @param {string} query
 * @param {number} page Page number to return.
 * @returns {ThunkActionPromise}
 */
export function searchDistillery(
  id: number,
  query: string,
  page?: number,
): ThunkActionPromise {
  return (dispatch) => {
    dispatch(generalQueryPending());

    return searchAPI.searchDistillery(id, query, page).then((response) => {
      dispatch(distilleryQuerySuccess(response));
    }).catch((response) => {
      if (response.response.status === 400) {
        dispatch(generalQueryFailed(response.response.data));
      } else {
        dispatch(addError(response));
      }
    });
  };
}
