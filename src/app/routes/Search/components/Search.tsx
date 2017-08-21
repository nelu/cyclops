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
import { InjectedRouter, LocationDescriptor } from 'react-router';
import * as _ from 'lodash';
import * as classnames from 'classnames';

// Local
import {
  DistilleryFlat,
  NormalizedDistilleryList,
} from '~/services/distilleries/types';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import {
  ContainerFlat,
} from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';
import { SearchBar } from './SearchBar';
import { SearchContainer } from './SearchContainer';
import { SearchField } from '~/routes/Search/components/SearchField';
import { SearchDistillery } from '~/routes/Search/components/SearchCollection';
import { NormalizedEntity } from '~/types/normalizr';
import { SearchQuery } from '~/routes/Search/components/SearchQuery';
import {
  AlertSearchResults,
  DistilleryListSearchResults,
  SearchQuery as SearchQueryInterface,
} from '~/services/search/types';
import { Loading } from '~/components/Loading';
import { parseQuery, updateQuery } from '~/utils/routerUtils';
import { SearchAlertResults } from '~/routes/Search/components/SearchAlertResults';
import { SearchDistilleryResults } from '~/routes/Search/components/SearchDistilleryResults';

// Local

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

export interface ValueProps {
  /** List of all the current containers in Cyphon. */
  containers: ContainerFlat[];
  /** List of all the current fields in Cyphon. */
  fields: Field[];
  /** List of all the current distilleries in Cyphon. */
  distilleries: DistilleryFlat[];
  /** Normalized list of the current distilleries. */
  normalized: NormalizedDistilleryList;
  /** Object representation of the current string query. */
  query: SearchQueryInterface | null;
  /** Total number of current results. */
  total: number;
  /** If more results are currently being loaded. */
  loading: boolean;
  /** List and metadata of the current alerts that match the query. */
  alertResults: AlertSearchResults | null;
  /** List and metadata of the raw data that matches the query. */
  distilleryResults: DistilleryListSearchResults | null;
  /** If the current search query string is valid. */
  valid: boolean;
  /** URL location object. */
  location: LocationDescriptor;
  /** URL router object. */
  router: InjectedRouter;
}
export interface FunctionProps {
  /** Fetches all container objects for the page. */
  fetchDistilleries(): any;
  search(query: string): any;
  searchAlerts(query: string, page?: number): any;
  searchDistillery(id: number, query: string, page?: number): any;
}

interface State {
  view: View;
  distillery: number;
  page: number;
}

interface SearchQueryParams {
  query?: string;
}

/** Properties of the Search component. */
type Props = ValueProps & FunctionProps;

/** Possible results views. */
enum View {
  Alert,
  Distillery,
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Root component of the Search page.
 */
export class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      view: View.Alert,
      distillery: 0,
      page: 1,
    };
  }
  /**
   * Returns the container object for a distillery from a normalized list
   * of containers.
   * @param {DistilleryFlat} distillery
   * @param {NormalizedEntity<ContainerFlat>} containers
   * @returns {ContainerFlat}
   */
  public static getDistilleryContainer(
    distillery: DistilleryFlat,
    containers?: NormalizedEntity<ContainerFlat>,
  ): ContainerFlat | undefined {
    if (containers) { return containers[distillery.container]; }

    return undefined;
  }

  /**
   * Returns the field objects related to a container object by mapping
   * Field ID's.
   * @param {ContainerFlat} container
   * @param {NormalizedEntity<Field>} fields
   * @returns {Field[]}
   */
  public static getContainerFields(
    container: ContainerFlat,
    fields?: NormalizedEntity<Field>,
  ): Field[] {
    if (!fields) { return []; }

    const fieldObjects: Field[] = [];

    container.fields.forEach((field) => {
      const fieldObject = fields[field];

      if (fieldObject) { fieldObjects.push(fieldObject); }
    });

    return fieldObjects;
  }

  /**
   * Parses the URL query params for this route.
   * @param query Object of current query parameters.
   * @returns {SearchQueryParams}
   */
  public static parseQuery(query: any): SearchQueryParams {
    return parseQuery(query, {});
  }

  public componentWillMount(): void {
    const query = this.getQuery();

    this.props.fetchDistilleries();

    if (query.query) { this.props.search(query.query); }
  }

  public componentWillReceiveProps(nextProps: Props): void {
    const currentQuery = this.getQuery();
    const nextQuery: SearchQueryParams = Search.parseQuery(
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
    this.setState({ view: View.Alert });
  };

  /**
   * Changes the view to the distillery result list.
   */
  public changeToDistilleryView = () => {
    this.setState({ view: View.Distillery });
  };

  /**
   * Gets the current URL query parameters.
   * @returns {SearchQueryParams}
   */
  public getQuery = (): SearchQueryParams => {
    return Search.parseQuery(this.props.location.query);
  };

  /**
   * Changes the URL to the alert detail view of the given alert ID.
   * @param {number} id
   */
  public openAlert = (id: number) => {
    this.props.router.push(`/alerts/${id}/`);
  };

  /**
   * Updates the current URL query parameters with the current query.
   * @param {string} query
   */
  public updateQuery = (query: string) => {
    updateQuery(this.props.router, this.props.location, { query });
  };

  public paginateAlerts = (page: number) => {
    const params = this.getQuery();

    if (params.query) {
      this.setState({ page });
      this.props.searchAlerts(params.query, page);
    }
  };

  public render() {
    const normalizedFields = this.props.normalized.entities.fields;
    const containers = this.props.containers.map((container) => (
      <SearchContainer
        fields={Search.getContainerFields(container, normalizedFields)}
        container={container}
        open={false}
      />
    ));
    const fields = this.props.fields.map((field) => (
      <SearchField field={field} />
    ));
    const distilleries = this.props.distilleries.map((distillery) => {
      const container = Search.getDistilleryContainer(
        distillery,
        this.props.normalized.entities.containers,
      );

      if (!container) { return null; }

      const fieldList = Search.getContainerFields(
        container,
        this.props.normalized.entities.fields,
      );

      return (
        <SearchDistillery
          distillery={distillery}
          container={container}
          fields={fieldList}
        />
      );
    });
    const query = this.props.query
      ? <SearchQuery query={this.props.query} valid={this.props.valid} />
      : null;
    const loading = this.props.loading ? <Loading /> : null;
    const view = ({
        [View.Alert]: (
          <SearchAlertResults
            openAlert={this.openAlert}
            results={this.props.alertResults}
            currentPage={this.state.page || 1}
            paginateAlerts={this.paginateAlerts}
          />
        ),
        [View.Distillery]: <SearchDistilleryResults />,
      } as any)[this.state.view];
    const alertResultCount = this.props.alertResults
      ? this.props.alertResults.count
      : 0;
    const dataResultCount = this.props.distilleryResults
      ? this.props.distilleryResults.count
      : 0;
    const alertViewButtonClasses = classnames('btn-basic', 'pill', {
      'pill--active': this.state.view === View.Alert,
    });
    const distilleryViewButtonClasses = classnames('btn-basic', 'pill', {
      'pill--active': this.state.view === View.Distillery,
    });

    return (
      <div className="flex-box flex-box--column">
        <div className="flex-box flex--shrink content banner">
          <SearchBar onSubmit={this.updateQuery} />
        </div>
        <div className="flex-box">
          <div className="flex-box flex--shrink sidebar sidebar--large">
            <div className="flex-item content">
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
            </div>
          </div>
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
                  {alertResultCount} Alerts
                </button>
                <button
                  onClick={this.changeToDistilleryView}
                  className={distilleryViewButtonClasses}
                >
                  {dataResultCount} Data
                </button>

              </div>
            </div>
            <div
              className="flex-box"
              style={{ 'border-top': 'solid 1px #3b3c41', 'border-bottom': 'solid 1px #2a2b2e'}}
            >
              {view}

            </div>
            {loading}
          </div>
        </div>
      </div>
    );
  }
}
