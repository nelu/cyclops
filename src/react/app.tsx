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
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  useRouterHistory,
} from 'react-router';
import { createHistory } from 'history';

// Local
import { CONFIG } from './config';
import { store } from './store';
import { DashboardContainer } from './views/Dashboard/containers/Dashboard';
import { LayoutContainer } from './views/app/components/Layout';
import { AlertViewContainer } from './views/Alerts/containers/AlertView';
import { AlertDetailContainer } from './views/Alerts/containers/AlertDetailContainer';

// CSS
require('./../../node_modules/mapbox-gl/dist/mapbox-gl.css');
require('./../../node_modules/nvd3/build/nv.d3.css');
require('./../scss/app.scss');

const browserHistory = useRouterHistory(createHistory)({
  basename: CONFIG.APP_BASE_URL,
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={LayoutContainer}>
        <IndexRoute component={DashboardContainer}/>
        <Route path="alerts" component={AlertViewContainer}>
          <Route
            path=":alertId"
            component={AlertDetailContainer}
          />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById(CONFIG.APP_CONTAINER_ID),
);
