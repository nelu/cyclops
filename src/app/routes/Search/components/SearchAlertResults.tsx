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
import { AlertSearchResults } from '~/services/search/types';
import { Pagination } from 'react-bootstrap';
import { SearchAlertResult } from '~/routes/Search/components/SearchAlertResult';
import { AlertDetail } from '~/services/alerts/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchAlertResults component. */
interface Props {
  page: number;
  count: number;
  results: AlertDetail[];
  onAlertClick(alertID: number): void;
  onPaginate(page: number): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the alert results returned from a search query.
 */
export class SearchAlertResults extends React.Component<Props, {}> {
  public onSelect = (eventKey: any) => {
    this.props.onPaginate(eventKey);
  };

  public render() {
    const results = this.props.results
      ? this.props.results.map((result) => (
        <SearchAlertResult
          onClick={this.props.onAlertClick}
          alert={result}
          key={result.id}
        />
      )) : null;
    const paginationItems = this.props.results
      ? Math.ceil(this.props.count / 10)
      : 1;

    return results && results.length
      ? (
        <div className="flex-box flex-box--column">
          <div className="flex-item">
            {results}
          </div>
          <div
            className="flex-item flex--shrink text-center content"
            style={{ 'border-top': 'solid 1px #3b3c41' }}
          >
            <Pagination
              items={paginationItems}
              activePage={this.props.page}
              onSelect={this.onSelect}
              maxButtons={5}
              next="Next"
              prev="Prev"
              first="First"
              last="Last"
            />
          </div>
        </div>
      ) : (
        <div className="flex-item content">
          <h2 className="text-center">No Results</h2>
        </div>
      );
  }
}
