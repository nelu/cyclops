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
import * as _ from 'lodash';
import { Dictionary } from '~/types/object';
import { Field } from '~/services/cyphon/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Object that represents a field in a search query. */
interface SearchQueryField {
  /** Original string this object was parsed from. */
  source: string;
  /** Name of the field to query. */
  field: string;
  /** Operator to query with. */
  operator?: string;
  /** Value to compare against. */
  value?: any;
}

interface RawSearchQueryField extends SearchQueryField {
  value?: string;
}

interface ParsedSearchQueryField extends SearchQueryField {
  value: any;
}

interface SearchQueryParamValue {}

type FieldsetOperators =
  'eq' |
  'in' |
  'gt' |
  'lt' |
  'gte' |
  'lte' |
  'regex' |
  'not:eq' |
  'not:in' |
  'not:regex' |
  'not:missing' |
  'within';

type ValueParser = (value: string) => any;

interface Fieldset {
  field_name: string;
  field_type: string;
  operator: string;
  value: any;
}

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Regex to parse SearchQueryFields from a string.
 * @type {RegExp}
 */
const QUERY_REGEX = /([a-zA-Z0-9_.]+)([=!~<>]+)?(".*?(?=")"?|\S*?(?= |$))?/g;

const FIELDSET_OPERATOR_MAPPING: Dictionary<string> = {
  '=': 'eq',
  '~': 'in',
  '>': 'gt',
  '<': 'lt',
  '>=': 'gte',
  '<=': 'lte',
  '!=': 'not:eq',
  '!~': 'not:in',
  '><': 'within',
};

const VALUE_PARSERS: Dictionary<ValueParser> = {
  BooleanField: (value) => value.toLowerCase() === 'true',
  FloatField: (value) => parseFloat(value),
  IntegerField: (value) => parseInt(value, 10),
};

/**
 * Parses a search query into a list of SearchQueryField objects.
 * @param query Search query.
 * @returns {SearchQueryField[]}
 */
export function getSearchQueryFields(query: string): RawSearchQueryField[] {
  const fields: RawSearchQueryField[] = [];
  let result: string[] | null = QUERY_REGEX.exec(query);

  while (result != null) {
    fields.push({
      source: result[0],
      field: result[1],
      operator: result[2],
      value: result[3] ? _.trim(result[3], '"') : undefined,
    });

    result = QUERY_REGEX.exec(query);
  }

  return fields;
}

export function parseSearchQueryFieldValue(value: string, type: string): any {
  const parser = VALUE_PARSERS[type];

  return parser ? parser(value) : value;
}

export function createFieldsets(
  queries: SearchQueryField[],
  fields: Dictionary<Field>,
): Fieldset[] {
  const fieldsets: Fieldset[] = [];

  queries.forEach((query) => {
    const field = fields[query.field];
    const operator = query.operator
      ? FIELDSET_OPERATOR_MAPPING[query.operator]
      : undefined;
    const value = query.value
      ? parseSearchQueryFieldValue(query.value, field.field_type)
      : query.value;

    if (field && operator && value) {
      fieldsets.push({
        field_name: field.field_name,
        field_type: field.field_type,
        operator,
        value,
      });
    }
  });

  return fieldsets;
}
