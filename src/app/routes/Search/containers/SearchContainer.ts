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
import { bindActionCreators as bind } from 'redux';
import {
  ComponentClass,
  connect,
} from 'react-redux';
import {
  InjectedRouter,
  LocationDescriptor,
  withRouter,
} from 'react-router';

// Local
import {
  DispatchToProps,
  StateToProps,
} from '~/types/redux';
import {
  ValueProps,
  FunctionProps,
  Search,
} from '../components/Search';
import * as resourceActions from '../actions/searchRouteResourcesActions';
import * as searchActions from '../actions/searchQueryActions';
import { fetchResults } from '../data/searchQuery/searchQueryActions';
import { paginateResults } from '../data/searchResults/searchResultsActions';
import { paginateAlertResults } from '../data/alertSearchResults/alertSearchResultsActions';
import { StoreState } from '~/store';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Container properties. */
interface ContainerProps {
  location: LocationDescriptor;
  router: InjectedRouter;
}

/** Function that maps the redux state to the wrapped component. */
type Values = StateToProps<ValueProps, ContainerProps>;

/** Function that maps redux dispatch functions to the wrapped component. */
type Functions = DispatchToProps<FunctionProps, ContainerProps>;

/** Container type. */
type Container = ComponentClass<ContainerProps>;

// --------------------------------------------------------------------------
// Property Mapping
// --------------------------------------------------------------------------

/**
 * Maps the redux state to wrapped component properties.
 * @param state Redux state.
 * @param props Container properties.
 */
const values = (state: StoreState, props: ContainerProps) => ({
  containers: state.routes.Search.resources.containers,
  distilleries: state.routes.Search.resources.distilleries,
  fields: state.routes.Search.resources.fields,
  normalized: state.routes.Search.resources.normalized,
  query: state.routes.Search.search.query,
  valid: state.routes.Search.search.valid,
  loading: state.routes.Search.search.loading,
  total: state.routes.Search.search.total,
  alertResults: state.routes.Search.search.alerts,
  distilleryResults: state.routes.Search.search.distilleries,
  // location: props.location,
  router: props.router,
});

/**
 * Maps redux dispatch functions to wrapped component properties.
 * @param dispatch Dispatch function for the redux store.
 */
const functions: Functions = (dispatch) => ({
  fetchDistilleries: bind(resourceActions.fetchDistilleries, dispatch),
  search: bind(fetchResults, dispatch),
  searchAlerts: bind(paginateAlertResults, dispatch),
  searchDistillery: bind(paginateResults, dispatch),
});

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Container for the SearchQueryStore component.
 * @type {Container}
 */
export const SearchContainer: Container = withRouter(
  connect(values, functions)(Search),
);
