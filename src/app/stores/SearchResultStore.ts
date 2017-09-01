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
import { observable, action, computed } from 'mobx';
import * as _ from 'lodash';

// Local
import { RootStore } from '~/stores';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { Dictionary } from '~/types/object';
import {
  DistilleryListSearchResults,
  DistillerySearchResults,
} from '~/services/search/types';
import { PromiseID } from '~/utils/PromiseID';
import { searchDistillery } from '~/services/search/utils/searchAPI';

export class SearchResultStore {
  public static MISSING_QUERY_STRING = (
    'Missing query string to paginate results with.'
  );
  public static MISSING_DISTILLERY_ID = (id: number) => (
    `Missing distillery ID ${id} from result list.`
  );

  @observable public distilleries: DistilleryMinimal[] = [];
  @observable public selectedDistilleryID?: number;
  @observable public count: number = 0;
  @observable public page: number = 1;
  @observable public isLoading: boolean = false;
  @observable public resultsByDistilleryID: Dictionary<DistillerySearchResults> = {};

  private stores: RootStore;
  private promiseID: PromiseID = new PromiseID();

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public setInitialResults = (results: DistilleryListSearchResults): void => {
    this.resultsByDistilleryID = _.keyBy(results.results, 'distillery.id');
    this.distilleries = results.results.map((result) => result.distillery);
    this.count = results.count;
    this.page = 1;
  };

  @action
  public selectDistillery = (id: number): void => {
    this.selectedDistilleryID = id;
  };

  @computed
  public get selectedResults(): DistillerySearchResults | undefined {
    if (!this.selectedDistilleryID) { return; }

    return this.resultsByDistilleryID[this.selectedDistilleryID];
  }

  @action
  public paginate = (distilleryID: number, page: number): Promise<void> => {
    const query = this.stores.searchQueryStore.searchQueryString;

    if (!query) {
      this.stores.errorStore.add(
        new Error(SearchResultStore.MISSING_QUERY_STRING),
      );
      return Promise.reject(SearchResultStore.MISSING_QUERY_STRING);
    }

    const promiseID = this.promiseID.reset();

    return searchDistillery(distilleryID, query, page)
      .then((response) => {
        if (!this.promiseID.matches(promiseID)) { return; }

        this.setDistilleryResults(distilleryID, response.results);
        this.page = page;
      })
      .catch((error) => { this.stores.errorStore.add(error); });
  };

  @action
  private setDistilleryResults = (
    distilleryID: number,
    results: DistillerySearchResults,
  ): void => {
    if (!this.resultsByDistilleryID[distilleryID]) {
      this.stores.errorStore.add(
        new Error(SearchResultStore.MISSING_DISTILLERY_ID(distilleryID)),
      );
    }

    this.resultsByDistilleryID[distilleryID] = results;
  };
}
