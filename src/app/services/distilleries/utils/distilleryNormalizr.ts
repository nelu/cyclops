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
  normalize,
  denormalize,
} from 'normalizr';
import * as _ from 'lodash';

// Local
import {
  DistilleryFlat,
  DistilleryNested,
  NormalizedDistilleryList,
} from '~/services/distilleries/types';
import {
  DISTILLERY_ENTITIES_KEY,
  DISTLLERY_LIST_SCHEMA,
} from '~/services/distilleries/constants';
import { ContainerFlat } from '~/services/containers/types';
import {
  getEntities,
  getEntitiesByID,
} from '~/utils/normalizrUtils';
import { Field } from '~/services/cyphon/types';
import { Dictionary } from '~/types/object';

/**
 * Normalizes a list of nested distillery objects.
 * @param distilleries Distilleries to normalize.
 * @returns {NormalizedDistilleryList}
 */
export function normalizeDistilleries(
  distilleries: DistilleryNested[],
): NormalizedDistilleryList {
  return normalize(distilleries, DISTLLERY_LIST_SCHEMA);
}

/**
 * Denormalizes a list of normalized distillery objects.
 * @param distilleries Distilleries to denormalize.
 * @returns {DistilleryNested[]}
 */
export function denormalizeDistilleries(
  distilleries: NormalizedDistilleryList,
): DistilleryNested[] {
  return denormalize(
    distilleries.result,
    DISTLLERY_LIST_SCHEMA,
    distilleries.entities,
  );
}

/**
 * Returns the list of distillery entities from a dictionary of normalized
 * entities.
 * @param entities Collection of indexed entities.
 * @returns {DistilleryFlat[]}
 */
export function getDistilleryEntities(
  entities: Dictionary<any>,
): DistilleryFlat[] {
  return getEntities<DistilleryFlat>(entities, DISTILLERY_ENTITIES_KEY);
}

/**
 * Gets the distillery container IDs from a normalized list of distilleries.
 * @param normalized Normalized distillery list.
 * @param distilleryIDs IDs of the distilleries to get container IDs of.
 * @returns {number[]}
 */
export function getDistilleryContainerIDs(
  normalized: NormalizedDistilleryList,
  distilleryIDs: number[],
): number[] {
  const distilleries = getEntitiesByID<DistilleryFlat>(
    normalized.entities,
    DISTILLERY_ENTITIES_KEY,
    distilleryIDs,
  );

  return distilleries.length
    ? _.uniq(distilleries.map((distillery) => distillery.container))
    : [];
}

/**
 * Gets the shared container fields of the selected distilleries.
 * @param normalized Normalized distillery list.
 * @param distilleryIDs IDs of the distilleries to get the shared fields of.
 * @returns {string[]} field_names of the fields.
 */
export function getSharedDistilleryFields(
  normalized: NormalizedDistilleryList,
  distilleryIDs: number[],
): Field[] {
  const containerIDs = getDistilleryContainerIDs(normalized, distilleryIDs);

  if (!containerIDs.length) { return []; }

  const containers = getEntitiesByID<ContainerFlat>(
    normalized.entities,
    'containers',
    containerIDs,
  );

  if (!containers.length) { return []; }

  const fields: string[][] = containers.map((container) => container.fields);
  const compressed = _.intersection(...fields);

  if (!compressed.length) { return []; }

  return getEntitiesByID<Field>(normalized.entities, 'fields', compressed);
}
