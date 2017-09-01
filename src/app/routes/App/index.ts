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
import {
  ErrorPopupState,
  ErrorPopupReducer,
} from './reducers/ErrorPopupReducer';
import {
  MonitorStatusState,
  MonitorStatusReducer,
} from './reducers/MonitorStatusReducer';
import { Layout } from '~/layout/components/Layout';

/** Redux state shape for the App view. */
export interface AppRouteState {
  /** ErrorPopup container. */
  ErrorPopup: ErrorPopupState;
  /** MonitorStatus container. */
  MonitorStatus: MonitorStatusState;
}

/**
 * Root component for the App view.
 * @type {ComponentClass<any>}
 */
export const AppRoute: ComponentClass<any> = Layout;

/** Redux reducer for the App view. */
export const AppRouteReducer = combineReducers<AppRouteState>({
  ErrorPopup: ErrorPopupReducer,
  MonitorStatus: MonitorStatusReducer,
});
