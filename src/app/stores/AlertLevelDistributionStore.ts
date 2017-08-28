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

// Local
import { RootStore } from '~/stores';
import { PieChartDataWithColor } from '~/services/chart/types';
import * as alertAPI from '~/services/alerts/utils/alertsAPI';
import { createPieChartDataFromObject } from '~/services/chart/utils/createPieChartData';
import { sortPieChartData } from '~/services/chart/utils/sortPieChartData';
import { addLevelPieChartColor } from '~/routes/Dashboard/utils/addLevelPieChartColor';
import { PromiseID } from '~/utils/PromiseID';

export class AlertLevelDistributionStore {
  @observable public isLoading: boolean = false;
  @observable public data: PieChartDataWithColor[] = [];

  private stores: RootStore;
  private promiseID: PromiseID = new PromiseID();

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public fetchData = (days: number): Promise<void> => {
    const promiseID = this.promiseID.reset();

    this.isLoading = true;

    return alertAPI.fetchAlertLevelDistribution(days)
      .then((distribution) => {
        if (!this.promiseID.matches(promiseID)) { return; }

        const pieChartData = createPieChartDataFromObject(distribution, true);
        const sortedPieChartData = sortPieChartData(pieChartData);

        this.isLoading = false;
        this.data =  addLevelPieChartColor(sortedPieChartData);
      })
      .catch((error) => {
        this.stores.errorStore.add(error);
        this.isLoading = false;
      });
  }
}
