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
import { connect } from 'react-redux';
import { bindActionCreators as bind } from 'redux';
import { LocationDescriptor } from 'react-router';
import { withRouter } from 'react-router';

// Local
import { DispatchToProps, StateToProps } from '~/store/types';
import { SearchResults } from '../components/SearchResults';
import { SearchRouteURLQuery } from '~/routes/Search/types';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { SearchResultDistilleryContainer } from './SearchResultDistilleryContainer';
import {
  getSelectedResults,
  getSelectedResultCount,
  getSelectedResultsPage,
  getSearchResultDistilleries,
  paginateResults,
} from '~/store/searchResults';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface ContainerProps {
  location: LocationDescriptor;
}

interface ValueProps {
  results: any[];
  count: number;
  page: number;
  selectedDistilleryID: number;
  distilleries: DistilleryMinimal[];
  location: LocationDescriptor;
}

interface FunctionProps {
  paginateResults(distilleryID: number, query: string, page: number): any;
}

type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

class Container extends React.Component<Props> {
  public changePage = (page: number) => {
    const URLQuery = this.props.location.query as SearchRouteURLQuery;

    if (URLQuery.query) {
      this.props.paginateResults(
        this.props.selectedDistilleryID,
        URLQuery.query,
        page,
      );
    }
  };

  public render() {
    const distilleries = this.props.distilleries.map((distillery) => (
      <SearchResultDistilleryContainer distillery={distillery} />
    ));

    return (
      <SearchResults
        results={this.props.results}
        count={this.props.count}
        page={this.props.page}
        onPaginate={this.changePage}
        distilleries={distilleries}
      />
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

const values: StateToProps<ValueProps, ContainerProps> = (state, props) => ({
  results: getSelectedResults(state.searchResults),
  count: getSelectedResultCount(state.searchResults),
  page: getSelectedResultsPage(state.searchResults),
  distilleries: getSearchResultDistilleries(state.searchResults),
  selectedDistilleryID: state.searchResults.selectedDistilleryID,
  location: props.location,
});

const functions: DispatchToProps<FunctionProps, ContainerProps> = (dispatch) => ({
  paginateResults: bind(paginateResults, dispatch),
});

export const SearchResultsContainer: React.ComponentClass<{}> = (
  withRouter(connect(values, functions)(Container))
);
