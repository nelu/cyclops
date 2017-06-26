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
import { InjectedRouter, Link } from 'react-router';

// Local
import { NormalizedDistilleryList } from '~/services/distilleries/types';
import { Route } from '~/components/Route';
import { RouterLocation } from '~/types/router';
import { Result } from '~/types/result';

// Local

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

export interface ValueProps {
  results: Result[];
}
export interface FunctionProps {
  /** Fetches all container objects for the page. */
  fetchDistilleries(): any;
}

/** Properties of the Search component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Root component of the Search page.
 */
export class Search extends React.Component<Props, {}> {
  public componentWillMount(): void {
    this.props.fetchDistilleries();
  }

  public render() {
    const results = this.props.results.length
      ? this.props.results.map((result) => (
        <div>{result}</div>
      ))
      : <h3 className="text-center">No Results</h3>;

    return (
      <div className="flex-box flex-box--column">
        <div className="flex-box flex--shrink">
          <div className="flex-item banner banner--dark">
            <Link
              to="/search/collections/"
              className="pill"
              activeClassName="pill--active"
            >
              Collections
            </Link>
            <Link
              to="/search/containers/"
              className="pill"
              activeClassName="pill--active"
            >
              Containers
            </Link>
            <Link
              to="/search/fields/"
              className="pill"
              activeClassName="pill--active"
            >
              Fields
            </Link>
          </div>
        </div>
        <div className="flex-box">
          <div className="flex-box flex--shrink sidebar sidebar--large">
            <div className="flex-item">
              {this.props.children}
            </div>
          </div>
          <div className="flex-box">
            <div className="flex-box flex--shrink">
              {results}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
