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
 * Container normalizr schema.
 * @type {schema}
 */
export const CONTAINER_SCHEMA = new schema.Entity('containers');

/**
 * Normalized list of container objects.
 * @type {schema.Array}
 */
export const CONTAINER_LIST_SCHEMA = new schema.Array(CONTAINER_SCHEMA);
