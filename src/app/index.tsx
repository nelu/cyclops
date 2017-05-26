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
import * as React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  useRouterHistory,
} from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';

// Local
import { getConfig } from './config';
import { store } from './store';
import { Routes } from './routes';
import { Search } from '~/routes/Search/Search';

/** React router history that uses the base url given by the parent template. */
const browserHistory = useRouterHistory(createHistory)({
  basename: getConfig().APP_BASE_URL,
});

// --------------------------------------------------------------------------
// Main Application
// --------------------------------------------------------------------------

/**
 * Root component of the application.
 * @type {JSX.Element}
 */
export const App = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Routes.App}>
        <IndexRoute component={Routes.Dashboard}/>
        <Route path="alerts" component={Routes.AlertList}>
          <Route path=":alertId" component={Routes.AlertDetail}/>
        </Route>
        <Route path="search" component={Search} />
      </Route>
    </Router>
  </Provider>
);
