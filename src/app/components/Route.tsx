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

// Local
import {
  QueryParseOptions,
  RouterInjectedProps,
} from '~/types/router';
import {
  parseQuery,
  updateQuery
} from '~/utils/routerUtils';

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Base react-router route component with commonly used helper functions.
 */
export class Route<
  Props extends RouterInjectedProps<Params, Query>, State, Params, Query
> extends React.Component<Props, State> {
  /**
   * Parsing options for getting the url query.
   * @type {QueryParseOptions}
   */
  public QUERY_PARSE_OPTIONS: QueryParseOptions = {};

  /**
   * Parses a url query based on the QUERY_PARSE_OPTIONS.
   * @param query Query to parse.
   * @returns {Query}
   */
  public parseURLQuery = (query: any): Query => {
    return parseQuery<Query>(query, this.QUERY_PARSE_OPTIONS);
  };

  /**
   * Gets the parsed url query passed in from react-router.
   * @returns {Query}
   */
  public getURLQuery = (): Query => {
    return this.parseURLQuery(this.props.location.query);
  };

  /**
   * Updates the current URL query.
   * @param query
   */
  public updateURLQuery = (query: Query) => {
    this.props.router.push({
      pathname: this.props.location.pathname,
      query: Object.assign({}, this.props.location.query, query),
    });
  };

  /**
   * Replaces the current URL query.
   * @param query Query to replace with.
   */
  public replaceURLQuery = (query: Query) => {
    this.props.router.push({
      pathname: this.props.location.pathname,
      query,
    });
  };

  /**
   * Returns the current url parameters passed in from react-router.
   * @returns {URLParams}
   */
  public getURLParams = (): Params => {
    return this.props.params;
  };
}
