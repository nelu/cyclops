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
import { Distillery } from './types';
import { Dictionary } from '../../types/object';

// Regex to use to find the distiller elementId.
const DISTILLERY_ID_REGEX = /\/distilleries\/(\d+)\//;

/**
 * Gets the distillery ID from a distillery URI.
 * @param uri Distillery URI to check.
 * @return {number}
 */
export function getDistilleryId(uri: string): number | undefined {
  const regexResults = DISTILLERY_ID_REGEX.exec(uri);

  if (!regexResults) return undefined;

  const distilleryId = regexResults[1];

  return _.toNumber(distilleryId);
}

/**
 * Shortens the distillery name by removing the backend name.
 * @returns {string}
 * @param name
 */
export function shortenDistilleryName(name: string): string {
  const indexOfFirstDot = name.indexOf('.');

  return name.substr(indexOfFirstDot + 1);
}

/**
 * Shortens the distillery names for a list of distilleries.
 * @param distilleries
 * @returns {any[]}
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

