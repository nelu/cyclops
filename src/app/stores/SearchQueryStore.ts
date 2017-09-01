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
import {
  AlertSearchResults,
  SearchQuery,
} from '~/services/search/types';
import * as searchAPI from '~/services/search/utils/searchAPI';
import { RootStore } from '~/stores';
import { PromiseID } from '~/utils/PromiseID';

export enum SearchQueryView {
  Alert,
  Distillery,
}

export class SearchQueryStore {
  @observable public searchQuery?: SearchQuery;
  @observable public searchQueryString: string = '';
  @observable public count: number = 0;
  @observable public isLoading: boolean = false;
  @observable public isValid: boolean = true;
  @observable public view: SearchQueryView = SearchQueryView.Alert;

  private stores: RootStore;
  private promiseID: PromiseID = new PromiseID();

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public search = (query: string): Promise<void> => {
    const promiseID = this.promiseID.reset();

    this.isLoading = true;
    this.searchQueryString = query;

    return searchAPI.search(query)
      .then((response) => {
        this.isLoading = false;
        this.isValid = true;
        this.searchQuery = response.query;
        this.count = response.results.count;
        this.stores.searchResultStore.setInitialResults(response.results.distilleries);
        this.stores.alertSearchResultStore.setInitialResults(response.results.alerts);
      })
      .catch((error) => {
        if (this.promiseID.matches(promiseID) && error.response.status === 400) {
          this.isLoading = false;
          this.isValid = false;
          this.searchQuery = error.response.data.query;
        } else {
          this.stores.errorStore.add(error);
        }
      });
  };

  @action
  public changeView(view: SearchQueryView): void {
    this.view = view;
  }
}
