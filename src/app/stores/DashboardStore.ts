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
import { observable, action } from 'mobx';
import * as _ from 'lodash';

// Local
import { RootStore } from '~/stores';

export class DashboardStore {
  @observable public days: number;
  @observable public total: number;

  private stores: RootStore;

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public changeDays = (days: number): Promise<void> => {
    return Promise.all([
      this.stores.alertCollectionDistributionStore.fetchData(days),
      this.stores.alertLevelDistributionStore.fetchData(days),
      this.stores.alertLevelTimeseriesStore.fetchData(days),
      this.stores.alertLocationStore.fetchData(days),
      this.stores.alertStatusDistributionStore.fetchData(days),
    ]).then(() => {
      this.total = _.reduce(
        this.stores.alertLevelDistributionStore.data,
        (sum, data) => sum + data.value,
        0,
      );
    });
  };
}
