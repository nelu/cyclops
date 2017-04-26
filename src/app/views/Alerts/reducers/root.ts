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
import { combineReducers} from 'redux';

// Local
import {
  reducer as alertDetailReducer,
  State as AlertDetailState,
} from './detail';
import {
  reducer as alertListReducer,
  State as AlertListState,
} from './list';
import {
  State as ContextSearchState,
  reducer as contextSearchReducer,
} from './contextSearch';
import {
  State as AlertViewState,
  reducer as alertViewReducer,
} from './view';

/**
 * State shape of the alerts domain.
 */
export interface State {
  context: ContextSearchState;
  detail: AlertDetailState;
  list: AlertListState;
  view: AlertViewState;
}

/**
 * Redux reducer for the alerts domain.
 */
export const reducer = combineReducers<State>({
  context: contextSearchReducer,
  detail: alertDetailReducer,
  list: alertListReducer,
  view: alertViewReducer,
});
