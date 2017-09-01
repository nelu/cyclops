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
import * as _ from 'lodash';
import * as classnames from 'classnames';

// Local
import { DistilleryNested } from '~/services/distilleries/types';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import { ContainerNested } from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';
import { SearchBar } from './SearchBar';
import { SearchContainer } from './SearchContainer';
import { SearchField } from '~/routes/Search/components/SearchField';
import { SearchDistillery } from '~/routes/Search/components/SearchCollection';
import { SearchQuery } from '~/routes/Search/components/SearchQuery';
import { SearchQuery as SearchQueryInterface } from '~/services/search/types';
import { Loading } from '~/components/Loading';
import { parseQuery } from '~/utils/routerUtils';
import { RouteProps } from '~/types/router';
import { FlexBox } from '~/components/FlexBox';
import { FlexItem } from '~/components/FlexItem';
import { SearchQueryView } from '~/stores/SearchQueryStore';
import { AlertDetail } from '~/services/alerts/types';
import { AlertSearchResultsContainer } from '../containers/AlertSearchResultsContainer';
import { SearchResultsContainer } from '../containers/SearchResultsContainer';

// Local

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface Props extends RouteProps<Params> {
  /** List of all the current containers in Cyphon. */
  containers: ContainerNested[];
  /** List of all the current fields in Cyphon. */
  fields: Field[];
  /** List of all the current distilleries in Cyphon. */
  distilleries: DistilleryNested[];
  /** Object representation of the current string query. */
  query?: SearchQueryInterface;
  /** Total number of current results. */
  total: number;
  /** If more results are currently being loaded. */
  isLoading: boolean;
  isValid: boolean;
  view: SearchQueryView;
  /** Fetches all container objects for the page. */
  fetchDistilleries(): any;
  search(query: string): any;
  changeView(view: SearchQueryView): any;
}

interface Params {
  query?: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Root component of the SearchQueryStore page.
 */
export class Search extends React.Component<Props, {}> {

  /**
   * Parses the URL query params for this route.
   * @param query Object of current query parameters.
   * @returns {Params}
   */
  public static parseQuery(query: any): Params {
    return parseQuery(query, {});
  }

  public componentWillMount(): void {
    const query = this.getQuery();

    this.props.fetchDistilleries();

    if (query.query) { this.props.search(query.query); }
  }

  public componentWillReceiveProps(nextProps: Props): void {
    const currentQuery = this.getQuery();
    const nextQuery: Params = Search.parseQuery(
      nextProps.location.query,
    );

    if (!_.isEqual(currentQuery, nextQuery) && nextQuery.query) {
      this.props.search(nextQuery.query);
    }
  }

  /**
   * Changes the view to the alert result list.
   */
  public changeToAlertView = () => {
    this.props.changeView(SearchQueryView.Alert);
  };

  /**
   * Changes the view to the distillery result list.
   */
  public changeToDistilleryView = () => {
    this.props.changeView(SearchQueryView.Distillery);
  };

  /**
   * Gets the current URL query parameters.
   * @returns {Params}
   */
  public getQuery = (): Params => {
    return Search.parseQuery(this.props.location.query);
  };

  /**
   * Changes the URL to the alert detail view of the given alert ID.
   * @param alert
   */
  public openAlert = (alert: AlertDetail) => {
    this.props.history.push(`/alerts/${alert.id}/`);
  };

  /**
   * Updates the current URL query parameters with the current query.
   * @param {string} query
   */
  public updateQuery = (query: string) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      query: { query },
    });
  };

  public render() {
    const containers = this.props.containers.map((container) => (
      <SearchContainer
        container={container}
        open={false}
      />
    ));
    const fields = this.props.fields.map((field) => (
      <SearchField field={field} />
    ));
    const distilleries = this.props.distilleries.map((distillery) => (
      <SearchDistillery key={distillery.id} distillery={distillery} />
    ));
    const query = this.props.query
      ? <SearchQuery query={this.props.query} isValid={this.props.isValid} />
      : null;
    const view = {
        [SearchQueryView.Alert]: (
          <AlertSearchResultsContainer viewAlert={this.openAlert} />
        ),
        [SearchQueryView.Distillery]: <SearchResultsContainer />,
      }[this.props.view];
    const alertViewButtonClasses = classnames('btn-basic', 'pill', {
      'pill--active': this.props.view === SearchQueryView.Alert,
    });
    const distilleryViewButtonClasses = classnames('btn-basic', 'pill', {
      'pill--active': this.props.view === SearchQueryView.Distillery,
    });

    return (
      <FlexBox column={true}>
        <FlexBox shrink={true} className="content banner">
          <SearchBar onSubmit={this.updateQuery} />
        </FlexBox>
        <FlexBox>
          <FlexBox shrink={true} className="sidebar sidebar--large">
            <FlexItem className="flex-item content">
              {query}
              <CollapsibleHeader title="Collections">
                {distilleries}
              </CollapsibleHeader>
              <CollapsibleHeader title="Fields">
                {fields}
              </CollapsibleHeader>
              <CollapsibleHeader title="Containers">
                {containers}
              </CollapsibleHeader>
            </FlexItem>
          </FlexBox>
          <div className="flex-box flex-box--column">
            <div className="flex-box flex--shrink">
              <div className="flex-item content" style={{ 'border-bottom': 'solid 1px #2a2b2e' }}>
                <span className="text--emphasis">
                  {this.props.total}
                </span>
                {' '}
                Results
                <button
                  onClick={this.changeToAlertView}
                  className={alertViewButtonClasses}
                  style={{ marginLeft: '2rem' }}
                >
                  {0} Alerts
                </button>
                <button
                  onClick={this.changeToDistilleryView}
                  className={distilleryViewButtonClasses}
                >
                  {0} Data
                </button>

              </div>
            </div>
            <div
              className="flex-box"
              style={{ 'border-top': 'solid 1px #3b3c41', 'border-bottom': 'solid 1px #2a2b2e'}}
            >
              {view}
            </div>

            {this.props.isLoading ? <Loading /> : null}

          </div>
        </FlexBox>
      </FlexBox>
    );
  }
}
