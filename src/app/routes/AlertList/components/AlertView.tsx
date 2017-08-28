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
import { bindActionCreators } from 'redux';
import { Router } from 'react-router';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Local
import { AlertList } from './AlertList';
import { AlertParams } from './AlertParams';
import {
  AlertSearchParams,
  AlertListItem,
  NormalizedCategoryList,
  Category,
} from '~/services/alerts/types';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { User } from '~/services/users/types';
import { parseQuery as parseURLQuery } from '~/utils/routerUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertView component that are values. */
export interface ValueProps {
  /** Alert list to display. */
  alerts: AlertListItem[];
  /** Categories to filter alerts with. */
  categories: Category[];
  /** Total number of alerts matching the search parameters. */
  count: number;
  /** Distilleries that have alerts associated with them. */
  distilleries: DistilleryMinimal[];
  /** If alerts are loading. */
  loading: boolean;
  /** If the alerts are currently being polled. */
  polling: boolean;
  /** ID of the currently selected alert. */
  selectedAlert: number | null;
  /** If polling is currently enabled for the view. */
  pollingEnabled: boolean;
  /** React Router location object. */
  location: Router.LocationDescriptor;
  /** React Router injected router object. */
  router: Router.InjectedRouter;
  /** List of all the current users. */
  users: User[];
}

/** Properties of the AlertView component that are functions. */
export interface FunctionProps {
  /**
   * Starts polling for alerts that match a set of search parameters.
   * @param params SearchQueryStore parameters to use.
   * @param interval Interval in ms to poll.
   */
  startPolling(params: AlertSearchParams, interval: number): any;
  /** Stops polling for alerts. */
  stopPolling(): any;
  /**
   * Searchs for alerts that match a set of search parameters.
   * @param params SearchQueryStore parameters to use.
   * @param poll If the search should be polled after it's completed.
   * @param interval Interval to poll alerts for.
   */
  searchAlerts(params: AlertSearchParams, poll: boolean, interval: number): any;
  fetchViewResources(): any;
}

/** Combined prop interfaces for AlertView component. */
export type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Main alerts view with alerts searching and detail view.
 */
export class AlertView extends React.Component<Props, {}> {
  /**
   * Default URL query.
   * @type {AlertSearchParams}
   */
  public static DEFAULT_QUERY: AlertSearchParams = {
    limit: 30,
    offset: 0,
  };

  /**
   * Parses the current URL query.
   * @param query Query object.
   * @returns {AlertSearchParams} URL query.
   */
  public static parseQuery = (query: any): AlertSearchParams => {
    const parsed = parseURLQuery(query, {
      integers: [
        'assigned_user',
        'categories',
        'collection',
        'limit',
        'offset',
      ],
      arrays: ['categories'],
    });

    return { ...AlertView.DEFAULT_QUERY, ...parsed };
  };

  /**
   * Retrieves the current user list, the current distillery list,
   * and searches for alerts based on the parameters in the url.
   */
  public componentWillMount(): void {
    const query = this.getQuery();

    this.props.fetchViewResources();
    this.props.searchAlerts(query, this.props.pollingEnabled, 5000);
  }

  /**
   * Searches for new alerts if the url query has changed.
   * @param {Object} nextProps The next props being passed in.
   */
  public componentWillReceiveProps(nextProps: Props): void {
    const currentParams = this.getQuery();
    const query = AlertView.parseQuery(nextProps.location.query);

    if (!_.isEqual(currentParams, query)) {
      this.props.searchAlerts(query, this.props.pollingEnabled, 5000);
    }
  }

  /**
   * Removes window listeners and stops aler list polling.
   */
  public componentWillUnmount(): void {
    this.props.stopPolling();
  }

  /**
   * Returns the current page number.
   * @returns {number} Current page number.
   */
  public getCurrentPage = (): number => {
    const params = this.getQuery();
    const limit = params.limit || 20;

    return (params.offset as number / limit) + 1;
  };

  /**
   * Returns the current url query.
   * @returns {AlertSearchParams}
   */
  public getQuery = (): AlertSearchParams => {
    return AlertView.parseQuery(this.props.location.query);
  };

  /**
   * Updates the search parameters in the url.
   * @param newParams The new search parameters to search with.
   */
  public updateQuery = (newParams: AlertSearchParams): void => {
    const { router, location } = this.props;
    const currentParams = this.getQuery();
    const query = _.assign({}, currentParams, newParams);

    router.push({ pathname: location.pathname, query });
  };

  /**
   * Updates the url to view the alerts detail view.
   */
  public viewAlert = (alertId: number): void => {
    this.props.router.push({
      pathname: `/alerts/${alertId}/`,
      query: this.props.location.query,
    });
  };

  /**
   * Updates the url query with a new content query parameter.
   * @param content String to change the content parameter to.
   */
  public searchContent = (content?: string) => {
    this.updateQuery({ content });
  };

  /**
   * Updates the url with a new page query parameter.
   * @param page Number to change the page parameter to.
   */
  public changePage = (page: number): void => {
    const params = this.getQuery();
    const offset = params.limit as any * (page - 1);

    this.updateQuery({ offset });
  };

  /**
   * Updates the url with new query parameters.
   * @param params
   */
  public changeParams = (params: AlertSearchParams): void => {
    this.updateQuery({ ...params, offset: 0 });
  };

  public startPoller = (): void => {
    this.props.startPolling(this.getQuery(), 5000);
  };

  public render(): JSX.Element {
    const currentPage = this.getCurrentPage();
    const params = this.getQuery();

    return (
      <div className="flex-box">
        <AlertParams
          params={params}
          categories={this.props.categories}
          users={this.props.users}
          distilleries={this.props.distilleries}
          changeParams={this.changeParams}
        />

        <AlertList
          alerts={this.props.alerts}
          count={this.props.count}
          content={params.content}
          limit={params.limit || 30}
          loading={this.props.loading}
          isPolling={this.props.polling}
          selectedAlert={this.props.selectedAlert}
          startPoller={this.startPoller}
          stopPoller={this.props.stopPolling}
          changePage={this.changePage}
          page={currentPage}
          searchContent={this.searchContent}
          viewAlert={this.viewAlert}
        />

        {this.props.children}
      </div>
    );
  }
}
