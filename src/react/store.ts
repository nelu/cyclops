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
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Reducer,
} from 'redux';
import * as Logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Local
import {
  reducer as alertsReducer,
  State as AlertsState,
} from './views/Alerts/reducers/root';
import {
  State as MonitorStatusState,
  reducer as monitorStatusReducer,
} from './views/app/reducers/monitorStatus';
import {
  State as ErrorPopupState,
  reducer as errorPopupReducer,
} from './views/app/reducers/errorPopup';
import {
  State as DashboardState,
  reducer as dashboardReducer,
} from './views/Dashboard/reducers/dashboard';

/** Shape of the redux store state. */
export interface StoreState {
  /** State related to the alerts view. */
  alert: AlertsState;
  /** State related to the dashboard view. */
  dashboard: DashboardState;
  /** State related to the monitor modal. */
  monitor: MonitorStatusState;
  /** State related to the error popup. */
  error: ErrorPopupState;
}

/**
 * Main redux reducer,
 * @type {Reducer<StoreState>}
 */
const reducers = combineReducers<StoreState>({
  alert: alertsReducer,
  dashboard: dashboardReducer,
  error: errorPopupReducer,
  monitor: monitorStatusReducer,
});

/**
 * Logger middleware for redux.
 * @type {Middleware}
 */
const logger = Logger({ collapsed: true });

/**
 * Middlewares to add to the redux store.
 * @type {GenericStoreEnhancer}
 */
const middlewares = applyMiddleware(thunkMiddleware, logger);

/**
 * Central redux store for the application
 * @type {Store<StoreState>}
 */
export const store = createStore<StoreState>(reducers, middlewares);
