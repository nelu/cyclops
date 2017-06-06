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
import { combineReducers } from 'redux';

// Local
import * as AlertDetail from './AlertDetail';
import * as AlertList from './AlertList';
import * as Dashboard from './Dashboard';
import * as App from './App';
import * as Search from './Search';

/** Redux state shape for the routes. */
export interface RoutesState {
  AlertDetail: AlertDetail.AlertDetailRouteState;
  AlertList: AlertList.AlertListRouteState;
  App: App.AppRouteState;
  Dashboard: Dashboard.DashboardRouteState;
}

/** Redux reducer for the routes. */
export const RoutesReducer = combineReducers<RoutesState>({
  AlertDetail: AlertDetail.AlertDetailRouteReducer,
  AlertList: AlertList.AlertListRouteReducer,
  App: App.AppRouteReducer,
  Dashboard: Dashboard.DashboardRouteReducer,
});

/** All the root route components for the react-router routes. */
export const Routes = {
  AlertDetail: AlertDetail.AlertDetailRoute,
  AlertList: AlertList.AlertListRoute,
  App: App.AppRoute,
  Dashboard: Dashboard.DashboardRoute,
  Search: Search.SearchRoute,
};
