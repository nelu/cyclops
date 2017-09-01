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
import { Search } from '../components/Search';
import { SearchQueryStore } from '~/stores/SearchQueryStore';
import { RouteProps } from '~/types/router';
import { DistilleryStore } from '~/stores/DistilleryStore';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the Search. */
interface Props extends RouteProps<any> {
  searchQueryStore?: SearchQueryStore;
  distilleryStore?: DistilleryStore;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/** Wrapped container component for the Search component. */
export const SearchContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    searchQueryStore: stores.searchQueryStore,
    distilleryStore: stores.distilleryStore,
  }),
)(
  observer((props: Props) => (
    <Search
      containers={props.distilleryStore!.containers}
      fields={props.distilleryStore!.fields}
      distilleries={props.distilleryStore!.distilleries}
      query={props.searchQueryStore!.searchQuery}
      total={props.searchQueryStore!.count}
      isLoading={props.searchQueryStore!.isLoading}
      view={props.searchQueryStore!.view}
      isValid={props.searchQueryStore!.isValid}
      fetchDistilleries={props.distilleryStore!.fetchDistilleries}
      search={props.searchQueryStore!.search}
      changeView={props.searchQueryStore!.changeView}
      location={props.location}
      history={props.history}
      match={props.match}
    />
  )),
);
