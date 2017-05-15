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
import { ComponentClass } from 'react';
import { combineReducers } from 'redux';

// Local
import { AlertDetailContainer } from './containers/AlertDetailContainer';
import {
  AlertDataContextSearchState,
  AlertDataContextSearchReducer,
} from './reducers/AlertDataContextSearchReducer';
import {
  AlertDetailState,
  AlertDetailReducer,
} from './reducers/AlertDetailReducer';
import {
  AlertDetailOutcomeState,
  AlertDetailOutcomeReducer,
} from './reducers/AlertDetailOutcomeReducer';

/** Redux state shape for the AlertDetail view. */
export interface AlertDetailRouteState {
  AlertDataContextSearch: AlertDataContextSearchState;
  AlertDetail: AlertDetailState;
  AlertDetailOutcome: AlertDetailOutcomeState;
}

/**
 * Root component for the AlertDetail view.
 * @type {Container}
 */
export const AlertDetailRoute: ComponentClass<any> = AlertDetailContainer;

/** Redux reducer for the AlertDetail view. */
export const AlertDetailRouteReducer = combineReducers<AlertDetailRouteState>({
  AlertDataContextSearch: AlertDataContextSearchReducer,
  AlertDetail: AlertDetailReducer,
  AlertDetailOutcome: AlertDetailOutcomeReducer,
});
