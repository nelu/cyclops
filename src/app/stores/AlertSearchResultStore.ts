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
import { AlertDetail } from '~/services/alerts/types';
import { PromiseID } from '~/utils/PromiseID';
import { searchAlerts } from '~/services/search/utils/searchAPI';
import { RootStore } from '~/stores';
import { AlertSearchResults } from '~/services/search/types';

export class AlertSearchResultStore {
  @observable public results: AlertDetail[] = [];
  @observable public count: number = 0;
  @observable public page: number = 1;
  @observable public isLoading: boolean = false;

  private promiseID: PromiseID = new PromiseID();
  private stores: RootStore;

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public setInitialResults(response: AlertSearchResults): void {
    this.results = response.results;
    this.count = response.count;
  }

  @action
  public paginate = (page: number): Promise<void> => {
    const promiseID = this.promiseID.reset();

    this.isLoading = true;

    return searchAlerts(this.stores.searchQueryStore.searchQueryString, page)
      .then((response) => {
        if (!this.promiseID.matches(promiseID)) { return; }

        this.isLoading = false;
        this.results = response.results.results;
        this.count = response.results.count;
        this.page = page;
      })
      .catch((error) => {
        if (!this.promiseID.matches(promiseID)) { this.isLoading = false; }

        this.stores.errorStore.add(error);
      });
  }
}
