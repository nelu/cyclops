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
import { NormalizedList } from '~/types/normalizr';
import { Dictionary } from '~/types/object';

/**
 * Updates a normalized list of objects with another normalized list
 * of objects.
 * @param data Data to update.
 * @param update Data to add.
 * @returns {NormalizedList<any, any>}
 */
export function updateNormalizedList(
  data: NormalizedList<any, any>,
  update: NormalizedList<any, any>,
): NormalizedList<any, any> {
  const result = _.union(data.result, update.result);

  return _.assign({}, data, update, { result });
}

/**
 * Gets entities from a dictionary of entities based on their ID.
 * @param entities Entities object to search.
 * @param ids IDS of the objects to get.
 * @returns {T[]} The entity objects.
 * @param name The name of the entities to search.
 */
export function getEntitiesByID<T>(
  entities: Dictionary<any>,
  name: string,
  ids: number[] | string[],
): T[] {
  const stored = entities[name];
  const objects: T[] = [];

  if (!stored) { return objects; }

  _.forEach(ids, (id) => {
    const entity = stored[id];

    if (entity) { objects.push(Object.assign({}, entity)); }
  });

  return objects;
}

/**
 * Returns entities from a dictionary of entities.
 * @param entities Dictionary of entities.
 * @param name Name of the entities to retrieve.
 * @returns {T[]} Entity objects.
 */
export function getEntities<T>(
  entities: Dictionary<any>,
  name: string,
): T[] {
  return _.values<T>(entities[name]);
}
