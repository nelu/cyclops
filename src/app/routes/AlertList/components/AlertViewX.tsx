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
import { InjectedRouter, LocationDescriptor } from 'react-router';
import { Pagination } from 'react-bootstrap';

// Local
import { AlertParams } from './AlertParams';
import {
  AlertSearchParams,
  AlertListItem,
  Category,
} from '~/services/alerts/types';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { User } from '~/services/users/types';
import { parseQuery as parseURLQuery } from '~/utils/routerUtils';
import { observer } from 'mobx-react';
import { FlexBox } from '~/components/FlexBox';
import { SearchBar } from '~/components/SearchBar';
import { PaginationRange } from '~/components/PaginationRange';
import { RefreshSpinner } from '~/components/RefreshSpinner';
import { FlexItem } from '~/components/FlexItem';
import { AlertListTable } from '~/routes/AlertList/components/AlertListTable';
import { Loading } from '~/components/Loading';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertView component that are values. */
interface Props {
  /** React Router location object. */
  activeAlertID?: number;
  alerts: AlertListItem[];
  categories: Category[];
  count: number;
  distilleries: DistilleryMinimal[];
  isLoading: boolean;
  isPolling: boolean;
  location: LocationDescriptor;
  router: InjectedRouter;
  users: User[];
  fetchCategories(): any;
  fetchDistilleries(): any;
  fetchUsers(): any;
  search(query: AlertSearchParams): any;
  startPolling(): any;
  stopPolling(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Main alerts view with alerts searching and detail view.
 */
@observer
export class AlertViewX extends React.Component<Props, {}> {
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

    return { ...AlertViewX.DEFAULT_QUERY, ...parsed };
  };

  /**
   * Retrieves the current user list, the current distillery list,
   * and searches for alerts based on the parameters in the url.
   */
  public componentWillMount(): void {
    const query = this.getQuery();

    this.props.fetchDistilleries();
    this.props.fetchCategories();
    this.props.fetchUsers();
    this.props.search(query);
  }

  /**
   * Searches for new alerts if the url query has changed.
   * @param {Object} nextProps The next props being passed in.
   */
  public componentWillReceiveProps(nextProps: Props): void {
    const currentParams = this.getQuery();
    const query = AlertViewX.parseQuery(nextProps.location.query);

    if (!_.isEqual(currentParams, query)) {
      this.props.search(query);
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
    return AlertViewX.parseQuery(this.props.location.query);
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
  public viewAlert = (alert: AlertListItem): void => {
    this.props.router.push({
      pathname: `/alerts/${alert.id}/`,
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
  public changePage = (page: any): void => {
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

  public render(): JSX.Element {
    const currentPage = this.getCurrentPage();
    const params = this.getQuery();
    const limit = params.limit || 30;
    const togglePolling = this.props.isPolling
      ? this.props.stopPolling
      : this.props.startPolling;

    return (
      <FlexBox>
        <AlertParams
          params={params}
          categories={this.props.categories}
          users={this.props.users}
          distilleries={this.props.distilleries}
          changeParams={this.changeParams}
        />

        <FlexBox column={true} shrink={true} className="alert-list__header">
          <FlexItem shrink={true} className="alert-list__header">
            <SearchBar
              initialValue={params.content}
              onSubmit={this.searchContent}
            />
            <div className="clearfix">
              <PaginationRange
                page={currentPage}
                size={limit}
                count={this.props.count}
              />
              <RefreshSpinner
                isActive={this.props.isPolling}
                text={'Enable/disable refreshing of the current alert list.'}
                onClick={togglePolling}
              />
            </div>
          </FlexItem>
          <FlexItem>
            <AlertListTable
              alerts={this.props.alerts}
              activeAlertID={this.props.activeAlertID}
              onClick={this.viewAlert}
            />
            {this.props.isLoading ? <Loading /> : null}
          </FlexItem>
          <FlexItem shrink={true} className="alert-list__pagination">
            <Pagination
              items={Math.ceil(this.props.count / limit)}
              activePage={currentPage}
              onSelect={this.changePage}
              maxButtons={6}
              next="Next"
              prev="Prev"
              first="First"
              last="Last"
            />
          </FlexItem>
        </FlexBox>

        {this.props.children}

      </FlexBox>
    );
  }
}
