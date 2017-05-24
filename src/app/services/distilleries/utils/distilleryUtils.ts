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
import { Dictionary } from '../../../types/object';
import { Distillery } from '../types';
import { orderKeys } from '~/utils/objectUtils';

/**
 * Shortens the distillery name by removing the backend name.
 * @returns {string}
 * @param name
 */
export function shortenDistilleryName(name: string): string {
  return name.substr(name.indexOf('.') + 1) || '';
}

/**
 * Returns the backend name from a distillery name.
 * @param name Distillery name.
 * @returns {string} Backend name.
 */
export function getBackendName(name: string): string {
  return name.substr(0, name.indexOf('.')) || '';
}

/**
 * Returns the warehouse name from a distillery name.
 * @param name Distillery name.
 * @returns {string} Warehouse name.
 */
export function getWarehouseName(name: string): string {
  return getBackendName(shortenDistilleryName(name));
}

/**
 * Shortens the distillery names for a list of distilleries.
 * @param distilleries
 * @returns {Dictionary<any>}
 */
export function shortenDistilleryDictionary(
  distilleries: Dictionary<any>,
): Dictionary<any> {
  const updatedDistilleries: Dictionary<any> = {};

  _.forEach(distilleries, (value: any, name: string) => {
    updatedDistilleries[shortenDistilleryName(name)] = value;
  });

  return updatedDistilleries;
}

/**
 * Sorts a list of distilleries by their warehouse alphabetically.
 * @param distilleries
 * @returns {Dictionary<Distillery[]>}
 */
export function sortByWarehouse(
  distilleries: Distillery[],
): Dictionary<Distillery[]> {
  const sorted: Dictionary<Distillery[]> = {};

  distilleries.forEach((distillery) => {
    const warehouse = getWarehouseName(distillery.name);
    const copied = Object.assign({}, distillery);

    if (sorted[warehouse]) { sorted[warehouse].push(copied); }
    else { sorted[warehouse] = [copied]; }
  });

  return orderKeys(sorted);
}
