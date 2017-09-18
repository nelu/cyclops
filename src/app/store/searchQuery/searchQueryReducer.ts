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
import { SearchQuery } from '~/services/search/types';
import { createReducer, updateState } from '~/store/utils';
import * as actions from './searchQueryActions';
import {
  PAGINATE_RESULTS_PENDING,
  PaginateResultsPendingAction,
} from '../searchResults/searchResultsActions';
import {
  PAGINATE_ALERT_RESULTS_PENDING,
  PaginateAlertResultsPendingAction,
} from '../alertSearchResults/alertSearchResultsActions';

export interface SearchQueryState {
  query: string;
  queryObject?: SearchQuery;
  isLoading: boolean;
  promiseID: symbol;
  view: actions.SearchQueryView;
}

export const searchQuery = createReducer<SearchQueryState>({
  query: '',
  isLoading: false,
  promiseID: Symbol(),
  view: actions.SearchQueryView.Alerts,
}, {
  [actions.FETCH_RESULTS_PENDING]: (
    state: SearchQueryState,
    action: actions.FetchResultsPendingAction,
  ) => updateState(state, {
    isLoading: true,
    query: action.payload.query,
    promiseID: action.payload.promiseID,
  }),

  [actions.FETCH_RESULTS_SUCCESS]: (
    state: SearchQueryState,
    action: actions.FetchResultsSuccessAction,
  ) => updateState(state, {
    isLoading: false,
    queryObject: action.payload.query,
  }),

  [actions.FETCH_RESULTS_FAILED]: (
    state: SearchQueryState,
    action: actions.FetchResultsFailedAction,
  ) => updateState(state, {
    isLoading: false,
    queryObject: action.payload,
  }),

  [actions.CHANGE_VIEW]: (
    state: SearchQueryState,
    action: actions.ChangeViewAction,
  ) => updateState(state, {
    view: action.payload,
  }),

  [PAGINATE_RESULTS_PENDING]: (
    state: SearchQueryState,
    action: PaginateResultsPendingAction,
  ) => updateState(state, {
    promiseID: action.payload,
  }),

  [PAGINATE_ALERT_RESULTS_PENDING]: (
    state: SearchQueryState,
    action: PaginateAlertResultsPendingAction,
  ) => updateState(state, {
    promiseID: action.payload,
  }),
});
