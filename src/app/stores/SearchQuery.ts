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

// class SearchQuery {
//   @observable public query?: SearchQuery;
//   @observable public queryString: string = '';
//   @observable public total: number = 0;
//   @observable public isLoading: boolean = false;
//   private root: RootStore;
//
//   constructor(root: RootStore) {
//     this.root = root;
//   }
//
//   @action public search = (query: string): Promise<void> => {
//     this.isLoading = true;
//
//     return searchAPI.search(query).then((response) => {
//
//     });
//   };
//
//   @action public paginateAlerts = (page: number): Promise<void> => {
//
//   };
// }
//
// export const searchQueryStore = new SearchQuery();
