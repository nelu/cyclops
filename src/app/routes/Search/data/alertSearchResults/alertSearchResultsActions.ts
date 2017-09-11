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
import {
  ReduxAction,
  ThunkActionPromise,
} from '~/types/redux';
import { StoreState } from '~/store';
import { searchAlerts } from '~/services/search/utils/searchAPI';
import { AlertSearchResults } from '~/services/search/types';
import { AlertDetail } from '~/services/alerts/types';
import { addError } from '~/routes/App/actions/ErroPopupActions';

const ACTION_PREFIX = 'ALERT_SEARCH_RESULTS';

function isValidPromise(promiseID: symbol, state: StoreState): boolean {
  return true;
}

function resultsExist(state: StoreState): boolean {
  return true;
}

// -- PAGINATE_ALERT_RESULTS_PENDING --
// Request for a new page of alert results has been sent.

export const PAGINATE_ALERT_RESULTS_PENDING = `${ACTION_PREFIX}/PAGINATE_ALERT_RESULTS_PENDING`;
export type PaginateAlertResultsPendingAction = ReduxAction<symbol>;
export function paginateAlertResultsPending(
  promiseID: symbol,
): PaginateAlertResultsPendingAction {
  return { type: PAGINATE_ALERT_RESULTS_PENDING, payload: promiseID };
}

// -- PAGINATE_ALERT_RESULTS_SUCCESS --
// Request for a new page of alert results was successful

export const PAGINATE_ALERT_RESULTS_SUCCESS = (
  `${ACTION_PREFIX}/PAGINATE_ALERT_RESULTS_SUCCESS`
);
export type PaginateAlertResultsSuccessAction = ReduxAction<{
  results: AlertDetail[];
  count: number;
  page: number;
}>;
export function paginateAlertResultsSuccess(
  results: AlertDetail[],
  count: number,
  page: number,
): PaginateAlertResultsSuccessAction {
  return {
    type: PAGINATE_ALERT_RESULTS_SUCCESS,
    payload: { results, count, page },
  };
}

// -- PAGINATE_ALERT_RESULTS_FAILED --
// Request for a new page of alert results failed.

export const PAGINATE_ALERT_RESULTS_FAILED = `${ACTION_PREFIX}/PAGINATE_ALERT_RESULTS_FAILED`;
export type PaginateAlertResultsFailedAction = ReduxAction<undefined>;
export function paginateAlertResultsFailed(): PaginateAlertResultsFailedAction {
  return { type: PAGINATE_ALERT_RESULTS_FAILED, payload: undefined };
}

export function paginateAlertResults(
  query: string,
  page: number,
): ThunkActionPromise {
  return (dispatch, getState) => {
    const promiseID = Symbol();

    dispatch(paginateAlertResultsPending(promiseID));

    return searchAlerts(query, page)
      .then((response) => {
        if (!isValidPromise(promiseID, getState())) { return; }

        dispatch(paginateAlertResultsSuccess(
          response.results.results,
          response.results.count,
          page,
        ));
      })
      .catch((error) => {
        dispatch(addError(error));

        if (isValidPromise(promiseID, getState())) {
          dispatch(paginateAlertResultsFailed());
        }
      });
  };
}
