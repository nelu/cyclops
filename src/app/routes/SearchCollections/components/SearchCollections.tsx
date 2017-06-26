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
import { InjectedRouter } from 'react-router';
import * as _ from 'lodash';

// Local
import {
  DistilleryFlat,
  NormalizedDistilleryList,
} from '~/services/distilleries/types';
import { Route } from '~/components/Route';
import { RouterLocation } from '~/types/router';
import { Collapsible } from '~/components/Collapsible';
import { DistilleryMultiAutocomplete } from '~/services/distilleries/components/DistilleryMultiAutocomplete';
import { toggleArrayValue } from '~/utils/arrayUtils';
import { getSharedDistilleryFields } from '~/services/distilleries/utils/distilleryNormalizr';
import { Field } from '~/services/cyphon/types';
import { SearchField } from '~/routes/Search/components/SearchField';
import { Filter } from '~/routes/Search/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

export interface URLParams {}

export interface URLQuery {
  distilleries?: number[];
  fields?: string[];
}

export interface ValueProps {
  resources: NormalizedDistilleryList;
  distilleries: DistilleryFlat[];
  location: RouterLocation<URLQuery>;
  router: InjectedRouter;
  params: URLParams;
}

export interface FunctionProps {}

/** Properties of the SearchCollections component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Root component of the SearchCollections route.
 */
export class SearchCollections extends Route<Props, {}, URLParams, URLQuery> {
  public static createFieldParam = (field: Field): string => {
    return `(${field.field_name}:${field.field_type})[]`;
  };
  public static parseFieldsParam = (fields?: string[]): Filter[] => {
    return fields
      ? fields.map((field) => ({
        field: field.substring(field.indexOf('(') + 1, field.indexOf(':')),
        type: field.substring(field.indexOf(':' + 1, field.indexOf(')'))),
        operator: field.substring(field.indexOf('[') + 1, field.indexOf(']')),
        value: field.substring(field.indexOf(']') + 1),
      }))
      : [];
  };

  public QUERY_PARSE_OPTIONS = {
    arrays: ['distilleries', 'fields'],
    integers: ['distilleries'],
  };

  public selectDistillery = (distillery: DistilleryFlat) => {
    const distilleries = toggleArrayValue(
      distillery.id,
      this.getURLQuery().distilleries,
    );

    this.updateURLQuery({ distilleries });
  };

  public clearDistilleries = () => {
    this.replaceURLQuery({ distilleries: undefined });
  };

  public addField = (field: Field) => {
    const query = this.getURLQuery();
    const value = SearchCollections.createFieldParam(field);
    const fields = _.concat(query.fields || [], value);

    this.updateURLQuery({ fields });
  };

  public getSharedFields = (query: URLQuery): Field[] => {
    return query.distilleries
      ? getSharedDistilleryFields(this.props.resources, query.distilleries)
      : [];
  };

  public getFilterElements = (query: URLQuery) => {
    return SearchCollections
      .parseFieldsParam(query.fields)
      .map((filter, index) => (
        <div key={index}>{filter.field}</div>
      ));
  };

  public getFieldElements = (query: URLQuery) => {
    const fields = this.getSharedFields(query);
    return fields.length
      ? fields.map((field) => (
        <SearchField field={field} onClick={this.addField} />
      ))
      : <div>No Shared Fields</div>;
  };

  public render() {
    const query = this.getURLQuery();
    const fields = this.getFieldElements(query);
    const filters = this.getFilterElements(query);

    return (
      <div className="sidebar__spacing">
        <Collapsible title="Collections">
          <DistilleryMultiAutocomplete
            distilleries={this.props.distilleries}
            selected={query.distilleries}
            onSelect={this.selectDistillery}
            onRemove={this.selectDistillery}
          />
        </Collapsible>
        <Collapsible title="Fields">
          {fields}
        </Collapsible>
        {filters}
      </div>
    );
  }
}
