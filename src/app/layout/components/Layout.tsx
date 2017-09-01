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
import { Route, Switch } from 'react-router-dom';

// Local
import { ErrorPopupContainer } from '../containers/ErrorPopupContainer';
import { FlexBox } from '~/components/FlexBox';
import { FlexItem } from '~/components/FlexItem';
import { Header } from '~/layout/components/Header';
import { DashboardRouteComponent } from '~/routes/Dashboard';
import { AlertsRouteComponent } from '~/routes/Alerts';
import { SearchRouteComponent } from '~/routes/Search';

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Main page layout for the application.
 */
export class Layout extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <FlexBox column={true}>
        <FlexItem shrink={true}>
          <Header />
        </FlexItem>

        <Switch>
          <Route exact={true} path="/" component={DashboardRouteComponent} />
          <Route path="/alerts" component={AlertsRouteComponent} />
          <Route path="/search" component={SearchRouteComponent} />
        </Switch>

        <ErrorPopupContainer />
      </FlexBox>
    );
  }
}
