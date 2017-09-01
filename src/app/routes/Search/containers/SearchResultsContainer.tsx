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
import { SearchResults } from '../components/SearchResults';
import { SearchResultStore } from '~/stores/SearchResultStore';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the SearchResults. */
interface Props {
  searchResultStore?: SearchResultStore;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/** Wrapped container component for the SearchResults component. */
export const SearchResultsContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    searchResultStore: stores.searchResultStore,
  }),
)(
  observer((props: Props) => (
    <SearchResults
      distilleries={props.searchResultStore!.distilleries}
      selectedDistilleryID={props.searchResultStore!.selectedDistilleryID}
      count={props.searchResultStore!.count}
      page={props.searchResultStore!.page}
      isLoading={props.searchResultStore!.isLoading}
      results={props.searchResultStore!.selectedResults}
      paginate={props.searchResultStore!.paginate}
      selectDistillery={props.searchResultStore!.selectDistillery}
    />
  )),
);
