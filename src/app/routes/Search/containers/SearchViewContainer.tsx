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
import { SearchView } from '../components/SearchView';
import { changeView, fetchResults } from '~/store/searchQuery';
import {
  getNestedContainers,
  getNestedDistilleries,
  getFields,
} from '~/store/distilleryStore/distilleryStoreSelectors';
import {
  DispatchToProps,
  StateToProps,
} from '~/store/types';
import { fetchDistilleries } from '~/store/distilleryStore';
import { ContainerNested } from '~/services/containers/types';
import { DistilleryNested } from '~/services/distilleries/types';
import { Field } from '~/services/cyphon/types';
import { SearchQueryView } from '~/store/searchQuery';
import { SearchAlertResultsContainer } from './SearchAlertResultsContainer';
import { SearchRouteURLQuery } from '~/routes/Search/types';
import { SearchResultsContainer } from './SearchResultsContainer';
import { SearchQuery } from '~/services/search/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface ContainerProps {
  location: LocationDescriptor;
  router: InjectedRouter;
}

interface ValueProps {
  containers: ContainerNested[];
  distilleries: DistilleryNested[];
  fields: Field[];
  query?: SearchQuery;
  location: LocationDescriptor;
  alertResultCount: number;
  resultCount: number;
  view: SearchQueryView;
  isLoading: boolean;
  isQueryValid: boolean;
  router: InjectedRouter;
}

interface FunctionProps {
  fetchContainerResources(): any;
  search(query: string): any;
  changeView(view: SearchQueryView): any;
}

type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

class Container extends React.Component<Props> {
  public static VIEWS = {
    [SearchQueryView.Alerts]: <SearchAlertResultsContainer />,
    [SearchQueryView.Data]: <SearchResultsContainer />,
  };

  public componentWillMount() {
    const URLQuery = this.props.location.query as SearchRouteURLQuery;

    this.props.fetchContainerResources();

    if (URLQuery.query) { this.props.search(URLQuery.query); }
  }

  public componentWillReceiveProps(props: Props) {
    const nextURLQuery = props.location.query as SearchRouteURLQuery;
    const currentURLQuery = this.props.location.query as SearchRouteURLQuery;

    if (nextURLQuery.query && currentURLQuery.query !== nextURLQuery.query) {
      this.props.search(nextURLQuery.query);
    }
  }

  public changeSearchQuery = (query: string): void => {
    this.props.router.push({
      pathname: this.props.location.pathname,
      query: { query },
    });
  };

  public render() {
    const initialQuery = (
      (this.props.location.query as SearchRouteURLQuery).query || ''
    );

    return (
      <SearchView
        containers={this.props.containers}
        distilleries={this.props.distilleries}
        initialQuery={initialQuery}
        fields={this.props.fields}
        alertResultCount={this.props.alertResultCount}
        resultCount={this.props.resultCount}
        view={this.props.view}
        isLoading={this.props.isLoading}
        queryObject={this.props.query}
        isQueryValid={this.props.isQueryValid}
        changeQuery={this.changeSearchQuery}
        changeView={this.props.changeView}
      >
        {Container.VIEWS[this.props.view]}
      </SearchView>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

const values: StateToProps<ValueProps, ContainerProps> = (state, props) => ({
  containers: getNestedContainers(state.distilleryStore),
  distilleries: getNestedDistilleries(state.distilleryStore),
  fields: getFields(state.distilleryStore),
  query: state.searchQuery.queryObject,
  alertResultCount: state.alertSearchResults.count,
  resultCount: state.searchResults.count,
  view: state.searchQuery.view,
  isQueryValid: state.searchQuery.isValid,
  isLoading: state.searchQuery.isLoading,
  total: state.alertSearchResults.count + state.searchResults.count,
  location: props.location,
  router: props.router,
});

const functions: DispatchToProps<FunctionProps, ContainerProps> = (dispatch) => ({
  fetchContainerResources: () => dispatch(fetchDistilleries()),
  search: (query: string) => dispatch(fetchResults(query)),
  changeView: (view: SearchQueryView) => dispatch(changeView(view)),
});

export const SearchViewContainer: ComponentClass<ContainerProps> = withRouter(
  connect(values, functions)(Container),
);
