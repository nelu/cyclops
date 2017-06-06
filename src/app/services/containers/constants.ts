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
import { schema } from 'normalizr';

/**
 * All the different container field types.
 * @type {Object<string, string>}
 */
export const CONTAINER_FIELDS = {
  POINT_FIELD: 'PointField',
  IP_ADDRESS: 'GenericIPAddressField',
};

/**
 * Normalizr schema of a container field object.
 * @type {schema.Entity}
 */
export const FIELD_SCHEMA = new schema.Entity('fields', {}, {
  idAttribute: 'field_name',
});

/**
 * Normalizr schema of a list of container field objects.
 * @type {schema.Array}
 */
export const FIELD_LIST_SCHEMA = new schema.Array(FIELD_SCHEMA);

/**
 * Normalizr schema for a taste object.
 * @type {schema.Entity}
 */
export const TASTE_SCHEMA = new schema.Entity('tastes');

/**
 * Normalizr schema of a container object.
 * @type {schema.Entity}
 */
export const CONTAINER_SCHEMA = new schema.Entity('containers', {
  fields: FIELD_LIST_SCHEMA,
  taste: TASTE_SCHEMA,
});

/**
 * Normalizr schema of a list of container objects.
 * @type {schema.Array}
 */
export const CONTAINER_LIST_SCHEMA = new schema.Array(CONTAINER_SCHEMA);
