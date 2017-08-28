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
import { PromiseID } from '~/utils/PromiseID';
import { AlertLocationResponse } from '~/services/alerts/types';
import { fetchAlertLocations } from '~/services/alerts/utils/alertsAPI';

export class AlertLocationStore {
  @observable public isLoading: boolean = false;
  @observable public data?: AlertLocationResponse;
  @observable public total: number = 0;

  private stores: RootStore;
  private promiseID: PromiseID = new PromiseID();

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public fetchData = (days: number): Promise<void> => {
    const promiseID = this.promiseID.reset();

    return fetchAlertLocations(days)
      .then((features) => {
        if (!this.promiseID.matches(promiseID)) { return; }

        this.data = features;
        this.total = features.features.length;
      })
      .catch((error) => {
        this.stores.errorStore.add(error);
      });
  };
}
