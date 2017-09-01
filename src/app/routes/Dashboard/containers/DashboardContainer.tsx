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
import { inject, observer } from 'mobx-react';

// Local
import { RootStore } from '~/stores';
import { Dashboard } from '../components/Dashboard';
import { RouteProps } from '~/types/router';
import { DashboardStore } from '~/stores/DashboardStore';
import { AlertStatusDistributionStore } from '~/stores/AlertStatusDistributionStore';
import { AlertCollectionDistributionStore } from '~/stores/AlertCollectionDistributionStore';
import { AlertLevelDistributionStore } from '~/stores/AlertLevelDistributionStore';
import { AlertLevelTimeseriesStore } from '~/stores/AlertLevelTimeseriesStore';
import { AlertLocationStore } from '~/stores/AlertLocationStore';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the Dashboard. */
interface Props extends RouteProps<any> {
  dashboardStore?: DashboardStore;
  alertStatusDistributionStore?: AlertStatusDistributionStore;
  alertCollectionDistributionStore?: AlertCollectionDistributionStore;
  alertLevelDistributionStore?: AlertLevelDistributionStore;
  alertLevelTimeseriesStore?: AlertLevelTimeseriesStore;
  alertLocationStore?: AlertLocationStore;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/** Wrapped container component for the Dashboard component. */
export const DashboardContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    dashboardStore: stores.dashboardStore,
    alertStatusDistributionStore: stores.alertStatusDistributionStore,
    alertCollectionDistributionStore: stores.alertCollectionDistributionStore,
    alertLevelDistributionStore: stores.alertLevelDistributionStore,
    alertLevelTimeseriesStore: stores.alertLevelTimeseriesStore,
    alertLocationStore: stores.alertLocationStore,
  }),
)(
  observer((props: Props) => (
    <Dashboard
      days={props.dashboardStore!.days}
      totalAlerts={props.dashboardStore!.total}
      levelDistribution={props.alertLevelDistributionStore!.data}
      levelDistributionLoading={props.alertLevelDistributionStore!.isLoading}
      statusDistribution={props.alertStatusDistributionStore!.data}
      statusDistributionLoading={props.alertStatusDistributionStore!.isLoading}
      collectionDistribution={props.alertCollectionDistributionStore!.data}
      collectionDistributionLoading={props.alertCollectionDistributionStore!.isLoading}
      locations={props.alertLocationStore!.data}
      locationFeatureCount={props.alertLocationStore!.total}
      locationsLoading={props.alertLocationStore!.isLoading}
      levelTimeseries={props.alertLevelTimeseriesStore!.data}
      levelTimeseriesLoading={props.alertLevelTimeseriesStore!.isLoading}
      getAlertStatistics={props.dashboardStore!.changeDays}
    />
  )),
);
