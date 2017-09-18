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

const DATA = {
  "id": 1,
  "first_name": "Stanfield",
  "last_name": "Lambot",
  "email": "slambot0@google.co.uk",
  "gender": "Male",
  "ip_address": "144.174.228.171",
  "WOOOO": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
  "something": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
  "neh": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
  "wahoo": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
  "stuff": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis."
};

const RESULTS: DistillerySearchResults[] = [{
  count: 5,
  distillery: {
    id: 1,
    name: 'elasticsearch.something.something',
    url: '',
  },
  next: '',
  previous: '',
  results: [DATA, DATA, DATA, DATA, DATA],
}, {
  count: 2,
  distillery: {
    id: 2,
    name: 'crumagin.super.lad',
    url: '',
  },
  next: '',
  previous: '',
  results: [DATA, DATA],
}];

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
    if (!RESULTS.length) {
      return (
        <div className="flex-box">
          <div className="flex-item content">
            <h2 className="text-center">No Results</h2>
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
