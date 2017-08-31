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
import {
  Pagination,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import * as classNames from 'classnames';

// Local
import { Loading } from '~/components/Loading';
import { AlertListItem } from '~/services/alerts/types';
import { AlertListSearchBar } from './AlertListSearchBar';
import {
  inject,
  observer
} from 'mobx-react';
import { AlertListTable } from '~/routes/AlertList/components/AlertListTable';
import { FlexBox } from '~/components/FlexBox';
import { getResultPaginationRange } from '~/utils/getResultPaginationRange';
import { PaginationRange } from '~/components/PaginationRange';
import { RefreshSpinner } from '~/components/RefreshSpinner';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertList component. */
interface Props {
  alerts: AlertListItem[];
  /** SearchQueryStore bar content. */
  content?: string;
  /** Pagination size of the current alerts list. */
  limit: number;
  /** Current page number of alerts. */
  page: number;
  count: number;
  isPolling: boolean;
  isLoading: boolean;
  activeAlertID?: number;
  /** Change the alerts list content search parameter. */
  searchContent(content?: string): any;
  /**
   * Changes the current alert list page.
   * @param page Page to change to.
   */
  changePage(page: number): any;
  viewAlert(id: number): any;
  togglePolling(): any;
  onClick?(id: number): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Current list of alerts that match the current search parameters.
 * Allows the user to select an alerts to view. Contains a
 * search bar that allows the user to search through alerts content.
 */
@observer
export class AlertListX extends React.Component<Props, {}> {
  /**
   * Popover to display when a user hovers over the refresh button.
   * @type {JSX.Element}
   */
  public static refreshPopover: JSX.Element = (
    <Popover id="alert-list-refresh-popover">
      Enable/disable refreshing of the current alert list.
    </Popover>
  );

  /**
   * Changes the current alerts page.
   * @param eventKey
   */
  public changePage = (eventKey: any) => {
    this.props.changePage(eventKey);
  };

  /**
   * Selects the alerts to view in the alerts detail panel.
   * @param id ID of the alert to view.
   */
  public selectAlert = (alert: AlertListItem) => {
    this.props.viewAlert(alert.id);
  };

  public render() {
    const paginationElement =  (
      <div className="alert-list__pagination flex-item flex--shrink">
        <Pagination
          items={Math.ceil(this.props.count / this.props.limit)}
          activePage={this.props.page}
          onSelect={this.changePage}
          maxButtons={6}
          next="Next"
          prev="Prev"
          first="First"
          last="Last"
        />
      </div>
    );
    const alertListTable = this.props.alerts.length ? (
      <AlertListTable
        alerts={this.props.alerts}
        activeAlertID={this.props.activeAlertID}
        onClick={this.selectAlert}
      />
    ) : (
      <h2 className="text-center">No Results</h2>
    );

    return (
      <FlexBox column={true}>
        <div className="alert-list__header flex-item flex--shrink">
          <AlertListSearchBar
            content={this.props.content}
            searchContent={this.props.searchContent}
          />
          <div className="clearfix">
            <PaginationRange
              page={this.props.page}
              size={this.props.limit}
              count={this.props.count}
            />
            <RefreshSpinner
              isActive={this.props.isPolling}
              text={'Enable/disable refreshing of the current alert list.'}
              onClick={this.props.togglePolling}
            />
          </div>
        </div>

        <div className="alert-list flex-item">
          {alertListTable}
          {this.props.isLoading ? <Loading /> : null}
        </div>
        {paginationElement}
      </FlexBox>
    );
  }
}
