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

// Local
import { AlertListStore } from '~/stores/AlertListStore';
import { ErrorStore } from '~/stores/ErrorStore';
import { UserStore } from '~/stores/UserStore';
import { AlertDetailStore } from '~/stores/AlertDetailStore';
import { MonitorStore } from '~/stores/MonitorStore';
import { AlertCollectionDistributionStore } from '~/stores/AlertCollectionDistributionStore';
import { AlertLevelDistributionStore } from '~/stores/AlertLevelDistributionStore';
import { AlertLevelTimeseriesStore } from '~/stores/AlertLevelTimeseriesStore';
import { AlertLocationStore } from '~/stores/AlertLocationStore';
import { AlertStatusDistributionStore } from '~/stores/AlertStatusDistributionStore';
import { DashboardStore } from '~/stores/DashboardStore';
import { PushNotificationStore } from '~/stores/PushNotifications';

/** Root data store for the application. */
export class RootStore {
  public alertDetailStore: AlertDetailStore = new AlertDetailStore(this);
  public alertListStore: AlertListStore = new AlertListStore(this);
  public alertCollectionDistributionStore: AlertCollectionDistributionStore = (
    new AlertCollectionDistributionStore(this)
  );
  public alertLevelDistributionStore: AlertLevelDistributionStore = (
    new AlertLevelDistributionStore(this)
  );
  public alertLevelTimeseriesStore: AlertLevelTimeseriesStore = (
    new AlertLevelTimeseriesStore(this)
  );
  public alertLocationStore: AlertLocationStore = new AlertLocationStore(this);
  public alertStatusDistributionStore: AlertStatusDistributionStore = (
    new AlertStatusDistributionStore(this)
  );
  public dashboardStore: DashboardStore = new DashboardStore(this);
  public errorStore: ErrorStore = new ErrorStore(this);
  public monitorStore: MonitorStore = new MonitorStore(this);
  public pushNotificationStore: PushNotificationStore = (
    new PushNotificationStore(this)
  );
  public userStore: UserStore = new UserStore(this);
}
