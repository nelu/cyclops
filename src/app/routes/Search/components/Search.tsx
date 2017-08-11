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
import { InjectedRouter, Link, LocationDescriptor } from 'react-router';

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
  containers: ContainerFlat[];
  fields: Field[];
  distilleries: DistilleryFlat[];
  normalized: NormalizedDistilleryList;
  query: SearchQueryInterface | null;
  total: number;
  loading: boolean;
  alertResults: AlertSearchResults | null;
  distilleryResults: DistilleryListSearchResults | null;
  valid: boolean;
  location: LocationDescriptor;
  router: InjectedRouter;
}
export interface FunctionProps {
  /** Fetches all container objects for the page. */
  fetchDistilleries(): any;
  search(query: string): any;
}

interface SearchQueryParams {
  view?: string;
  page?: number;
  pageSize?: number;
  distillery?: number;
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
export class Search extends React.Component<Props, {}> {
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
  public static parseQueryParams(query: any): SearchQueryParams {
    return parseQuery(query, {
      integers: ['page', 'pageSize', 'distillery'],
    });
  }

  public componentWillMount(): void {
    this.props.fetchDistilleries();
  }

  /**
   * Changes the view to the alert result list.
   */
  public changeToAlertView = () => {
    updateQuery(this.props.router, this.props.location, {
      view: View.Alert,
      distillery: undefined,
    });
  };

  public changeToDistilleryView = () => {
    updateQuery(this.props.router, this.props.location, {
      view: View.Distillery,
    });
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
    const params = Search.parseQueryParams(this.props.location.query);
    const view: JSX.Element | null = params.view
      ? ({
        [View.Alert]: <SearchAlertResults results={this.props.alertResults}/>,
        [View.Distillery]: <SearchDistilleryResults />,
      } as any)[params.view] : null;

    return (
      <div className="flex-box flex-box--column">
        <div className="flex-box flex--shrink content banner">
          <SearchBar onSubmit={this.props.search} />
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
              <div className="flex-item">
                Total {this.props.total}
                <a
                  onClick={this.changeToAlertView}
                  className="pill pill--active"
                >
                  Alerts {this.props.alertResults ? this.props.alertResults.count : 0}
                </a>
                <a
                  onClick={this.changeToDistilleryView}
                  className="pill"
                >
                  Collections {this.props.distilleryResults ? this.props.distilleryResults.count : 0}
                </a>

              </div>
            </div>
            {view}
            {loading}
          </div>
        </div>
      </div>
    );
  }
}
