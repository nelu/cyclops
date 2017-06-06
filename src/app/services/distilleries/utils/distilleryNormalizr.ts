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

// Local
import {
  DistilleryNested,
  NormalizedDistilleryList,
} from '~/services/distilleries/types';
import { DISTLLERY_LIST_SCHEMA } from '~/services/distilleries/constants';

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
