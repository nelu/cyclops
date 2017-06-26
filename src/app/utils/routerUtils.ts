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
import {
  InjectedRouter,
  LocationDescriptor,
} from 'react-router';
import * as _ from 'lodash';

// Local
import { Dictionary } from '~/types/object';
import { parseIntArray } from '~/utils/arrayUtils';

interface QueryParseOptions {
  integers?: string[];
  arrays?: string[];
}

/**
 * Updates the current location query url.
 * @param router Injected route router.
 * @param location Current router location.
 * @param newQuery Query object to update current with.
 */
export function updateQuery(
  router: InjectedRouter,
  location: LocationDescriptor,
  newQuery: Dictionary<any>,
): void {
  router.push({
    pathname: location.pathname,
    query: Object.assign({}, location.query, newQuery),
  });
}

/**
 * Parses the url parameters that are integers.
 * @param query Location query object.
 * @param fields Fields to parse into integers.
 * @returns {any}
 */
export function parseIntParams<T>(query: any = {}, fields: string[]): T {
  const parsed: any = {};

  fields.forEach((field) => {
    const value = query[field];

    if (value) { parsed[field] = parseIntArray(query[field]); }
  });

  return { ...query, ...parsed };
}

export function forceArrayParams<T>(query: any = {}, fields: string[]): T {
  const forced: any = {};

  fields.forEach((field) => {
    const value = query[field];

    if (value) { forced[field] = _.concat([], value); }
  });

  return { ...query, ...forced };
}

/**
 * Parses a routes url query to maintain a consistent query state with
 * correct types.
 * @param query URL query object.
 * @param options Parsing options.
 * @returns {any}
 */
export function parseQuery<T>(query: any = {}, options: QueryParseOptions): T {
  const parsed: any = {};

  _.forEach(query, (value: string | string[], parameter: string) => {
    if (value) {
      let modified: any = value;

      if (options.arrays && _.includes(options.arrays, parameter)) {
        modified = _.concat([], modified);
      }
      if (options.integers && _.includes(options.integers, parameter)) {
        modified = parseIntArray(modified);
      }

      parsed[parameter] = modified;
    }
  });

  return { ...query, ...parsed };
}
