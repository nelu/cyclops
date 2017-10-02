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
import { Pagination, ListGroup } from 'react-bootstrap';
import { Result } from '~/types/result';
import { DistillerySearchResults } from '~/services/search/types';
import { JSONFormatter } from '~/components/JSONFormatter';
import { SearchQueryInstructions } from '~/routes/Search/components/SearchQueryInstructions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchResults component. */
interface Props {
  results: Result[];
  count: number;
  page: number;
  distilleries: JSX.Element[];
  onPaginate(page: number): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * List of results from distillery stores that match the current query.
 */
export class SearchResults extends React.Component<Props> {

  public changePage = (eventKey: any) => {
    this.props.onPaginate(eventKey);
  };

  public render() {
    if (!this.props.distilleries.length) {
      return (
        <div className="flex-box">
          <div className="flex-item content">
            <h1 className="text-center text--muted">No Results</h1>
            <SearchQueryInstructions />
          </div>
        </div>
      );
    }
    const results = this.props.results.map((result) => (
      <div style={{ 'padding': '15px', 'border-bottom': '1px solid #2a2b2e' }}>
        <JSONFormatter json={result}/>
      </div>
    ));

    return (
      <div className="flex-box">
        <div className="flex-box flex--shrink">
          <div className="flex-item">
            <ListGroup>
              {this.props.distilleries}
            </ListGroup>
          </div>
        </div>
        <div className="flex-box flex-box--column">
          <div className="flex-box">
            <div className="flex-item">
              {results}
            </div>
          </div>
          <div className="flex-box flex--shrink">
            <div className="flex-item text-center" style={{ padding: '15px' }}>
              <Pagination
                items={Math.ceil(this.props.count / 10)}
                activePage={this.props.page}
                onSelect={this.changePage}
                maxButtons={5}
                next="Next"
                prev="Prev"
                first="First"
                last="Last"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
