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
  AlertDetailReducer,
  AlertDetailState,
} from './containers/AlertDetailReducer';
import {
  reducer as alertListReducer,
  State as AlertListState,
} from './containers/AlertViewReducer';
import {
  AlertDataContextSearchState,
  AlertDataContextSearchReducer,
} from './containers/AlertDataContextSearchReducer';
import {
  AlertDetailOutcomeReducer,
  AlertDetailOutcomeState,
} from './containers/AlertDetailOutcomeReducer';

/** State shape of the alerts domain. */
export interface State {
  context: AlertDataContextSearchState;
  detail: AlertDetailState;
  outcome: AlertDetailOutcomeState;
  view: AlertListState;
}

/**
 * Redux reducer for the alerts domain.
 */
export const reducer = combineReducers<State>({
  context: AlertDataContextSearchReducer,
  detail: AlertDetailReducer,
  outcome: AlertDetailOutcomeReducer,
  view: alertListReducer,
});
