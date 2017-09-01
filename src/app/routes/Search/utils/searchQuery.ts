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

// Local
import { DistilleryMinimal } from '~/services/distilleries/types';
import { Dictionary } from '~/types/object';
import { ContainerFlat } from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Possible SearchQueryParam types. */
type SearchQueryParamType = 'collection' | 'container' | 'field' | '';

/**
 * Function that parses a query parameter stores string into it's
 * represented stores.
 */
type SearchQueryParamDataParser = (
  param: SearchQueryParam,
  resources: SearchQueryResources,
) => ParsedSearchQueryParamData<any>;

interface SearchQueryParam {
  index: number;
  type: SearchQueryParamType;
  data: string;
  source: string;
  error?: string;
}

/** SearchQueryStore operation to perform on a given field. */
interface SearchQueryField {
  /** field_name of the field to perform the operation on. */
  field: string;
  /** Operation type to perform. */
  operator: string;
  /** Value to test the operation on. */
  value: any;
}

/** Parsed stores from a search query string. */
interface ParsedSearchQuery {
  /** ID's of the currently selected distilleries. */
  distilleries: number[];
  /** ID's of the currently selected containers. */
  containers: number[];
  /** Parsed field query operations. */
  fields: SearchQueryField[];
  /** Any errors that occurred during parsing. */
  errors: string[];
}

/** Object containing resources necessary for parsing SearchQueryParam stores. */
interface SearchQueryResources {
  /** Object of distilleries indexed by their shortened name. */
  distilleries: Dictionary<DistilleryMinimal>;
  /** Object of container indexed by their name. */
  containers: Dictionary<ContainerFlat>;
  /** Object of fields indexed by their field_name. */
  fields: Dictionary<Field>;
}

/** Object created when a SearchQueryParam object is parsed for it's stores. */
interface ParsedSearchQueryParamData<T> {
  /** Index of the param this stores comes from. */
  param: number;
  /** Data parsed from the param. */
  value?: T;
  /** Error that occurred during parsing. */
  error?: string;
}

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Possible search query parameter types.
 * @type {string[]}
 */
const SEARCH_QUERY_PARAM_TYPES = ['collection', 'container', 'field'];

const FIELD_OPERATOR_CHOICES = {
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

const FIELD_OPERATORS = ['equals', 'contains', '<', '~', '!=', '!~', '<=', '>=', '><'];

const FIELD_REGEX = /(\w*): (\S*) (=|<|>|~|!=|!~|<=|>=|><) (.*)/;

/**
 * Regex used to create a SearchQueryParam.
 * @type {RegExp}
 */
const SEARCH_QUERY_PARAM_REGEX = /(\w*): (.*)/;

/**
 * Dictionary of SearchQueryParamDataParser functions mapped to the possible
 * SearchQueryPamTypes.
 * @type {Dictionary<SearchQueryParamDataParser>}
 */
const PARAM_DATA_PARSERS: Dictionary<SearchQueryParamDataParser> = {
  collection: (param, resources) => parseCollectionParamData(param, resources),
  container: (param, resources) => parseContainerParamData(param, resources),
  field: (param, resources) => parseFieldParamData(param, resources),
};

// --------------------------------------------------------------------------
// Private Functions
// --------------------------------------------------------------------------

/**
 * Creates a SearchQueryParam object.
 * @param index Index of the parameter in the search query.
 * @param source String this object was created from.
 * @param type Type of parameter.
 * @param data Parsed stores of parameter.
 * @param error An error that occurred during parsing.
 * @returns {SearchQueryParam}
 */
function createSearchQueryParam(
  index: number,
  source: string,
  type: SearchQueryParamType,
  data: string,
  error?: string,
): SearchQueryParam {
  return { index, source, type, data, error };
}

/**
 * Creates a ParsedSearchQueryParamData object.
 * @param param Index value of the SearchQueryParam object.
 * @param value Parsed parameter value.
 * @param error An error that occurred during parsing.
 * @returns {ParsedSearchQueryParamData<T>}
 */
function createParsedValue<T>(
  param: number,
  value?: T,
  error?: string,
): ParsedSearchQueryParamData<T> {
  return { param, value, error };
}

/**
 * Creates a ParsedSearchQuery object.
 * @param distilleries ID's of the selected distilleries.
 * @param containers ID's of the selected containers.
 * @param fields Parsed SearchQueryFields from the parsed
 *   field SearchQueryParam's.
 * @param errors Any errors that occurred during parsing.
 * @returns {ParsedSearchQuery}
 */
function createSearchQueryData(
  distilleries: number[],
  containers: number[],
  fields: SearchQueryField[],
  errors: string[],
): ParsedSearchQuery {
  return { distilleries, containers, fields, errors };
}

/**
 * Parses the parameter stores from the stores string for a collection parameter.
 * This will be the selected distillery ID. Returns 0 if it can't find the
 * distillery.
 * @param data Query stores string.
 * @param resources Query stores resources.
 * @returns {number} Selected distillery ID.
 */
function parseCollectionParamData(
  param: SearchQueryParam,
  resources: SearchQueryResources,
): ParsedSearchQueryParamData<number> {
  const selected = resources.distilleries[param.data];

  if (!selected) {
    return createParsedValue<number>(
      param.index,
      undefined,
      `Distillery name ${param.data} from "${param.source}" does not ` +
      `exist on the given distillery list.`,
    );
  }

  return createParsedValue(param.index, selected.id);
}

/**
 * Parses the parameter stores from the stores string of a container parameter.
 * This will be the selected container ID. Returns 0 if it can't find
 * the container.
 * @param data Query parameter stores string.
 * @param resources Query stores resources.
 */
function parseContainerParamData(
  param: SearchQueryParam,
  resources: SearchQueryResources,
): ParsedSearchQueryParamData<number> {
  const selected = resources.containers[param.data];

  if (!selected) {
    return createParsedValue<number>(
      param.index,
      undefined,
      `Container name "${param.data}" from "${param.source}" does not exist ` +
      `on the given container list.`,
    );
  }

  return createParsedValue(param.index, selected.id);
}

function parseFieldParamData(
  param: SearchQueryParam,
  resources: SearchQueryResources,
): ParsedSearchQueryParamData<SearchQueryField> {
  const parsedFieldData = FIELD_REGEX.exec(param.data);

  if (!parsedFieldData) {
    return createParsedValue(
      param.index,
      undefined,
      `Couldn't parsed field data from parameter "${param.source}".`,
    );
  }

  const field = parsedFieldData[1];
  const selected = resources.fields[field];

  if (!selected) {
    return createParsedValue(
      param.index,
      undefined,
      `Field name "${field}" parsed from parameter "${param.source}" is not ` +
      `present in the given field list.`,
    );
  }

  const operator = parsedFieldData[2];

  if (!_.includes(FIELD_OPERATORS, operator)) {
    return createParsedValue(
      param.index,
      undefined,
      `Field operator "${operator}" is not included in the selectable field ` +
      `operators`,
    );
  }

  return {} as any;
}

/**
 * Determines if the given type is a valid SearchQueryParamType.
 * @param type String to check.
 * @returns {boolean}
 */
function isSearchQueryParamType(type: string): type is SearchQueryParamType {
  return _.includes(SEARCH_QUERY_PARAM_TYPES, type);
}

function parseParamData(
  param: SearchQueryParam,
  resources: SearchQueryResources,
): ParsedSearchQueryParamData<any> {
  const parser = PARAM_DATA_PARSERS[param.type];

  if (parser) { return parser(param, resources); }

  return {
    param: param.index,
    error: `Couldn't parse param data of "${param.source}". No parser for ` +
      `param type "${param.type}"`,
  };
}

/**
 * Returns ParsedSearchQuery from a list of Params.
 * @param params List of Params to parse stores from.
 * @param resources Object of resources needed to parse stores.
 * @returns {ParsedSearchQuery}
 */
function getSearchQueryData(
  params: SearchQueryParam[],
  resources: SearchQueryResources,
): ParsedSearchQuery {
  const distilleries: number[] = [];
  const containers: number[] = [];
  const fields: SearchQueryField[] = [];
  const errors: string[] = [];
  const mapped: Dictionary<any[]> = {
    collection: distilleries,
    container: containers,
    field: fields,
  };

  params.forEach((param) => {
    if (!param.error) {
      const parsed = parseParamData(param, resources);

      if (parsed.error) {
        errors.push(parsed.error);
        return;
      }

      mapped[param.type].push(parsed.value);
    } else {
      errors.push(param.error);
    }
  });

  return createSearchQueryData(distilleries, containers, fields, errors);
}

/**
 * Parses search query string parameter into SearchQueryParam object.
 * @param param SearchQueryStore query string parameter.
 * @returns {SearchQueryParam}
 */
function parseQueryParam(
  param: string,
  index: number,
): SearchQueryParam {
  const parsed = SEARCH_QUERY_PARAM_REGEX.exec(param);
  const create = (
    type: SearchQueryParamType,
    data: string,
    error?: string,
  ): SearchQueryParam => {
    return createSearchQueryParam(index, param, type, data, error);
  };

  if (!parsed) {
    return create('', '', `Couldn't parse parameter from "${param}".`);
  }

  const type = parsed[1];

  if (!type) {
    return create('', '', `Couldn't parse parameter type of "${param}".`);
  }

  if (!isSearchQueryParamType(type)) {
    return create('', '', `"${type}" is not a valid parameter type.`);
  }

  const data = parsed[2];

  if (!data) {
    return create(type, '', `Couldn't parse parameter data of "${param}".`);
  }

  return create(type, data);
}

/**
 * Parses a search query string into SearchQueryParam objects.
 * @param query Query string.
 * @returns {SearchQueryParam[]}
 */
function parseQueryParams(query: string): SearchQueryParam[] {
  const params = query.split(',');
  const parsedParams: SearchQueryParam[] = [];

  params.forEach((param, index) => {
    const parsed = parseQueryParam(param, index);

    parsedParams.push(parsed);
  });

  return parsedParams;
}

// --------------------------------------------------------------------------
// Public Functions
// --------------------------------------------------------------------------

/**
 * Parses a search query string into a ParsedSearchQuery object.
 * @param query SearchQueryStore query string to parse.
 * @param resources Objects needed to parse the SearchQueryParam stores.
 * @returns {ParsedSearchQuery}
 */
export function parseSearchQuery(
  query: string,
  resources: SearchQueryResources,
): ParsedSearchQuery {
  const params = parseQueryParams(query);

  if (!params.length) { return createSearchQueryData([], [], [], []); }

  return getSearchQueryData(params, resources);
}
