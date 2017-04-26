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
import { CONTAINER_SCHEMA } from '../containers/schemas';
import { CONTEXT_LIST_SCHEMA } from '../contexts/schemas';

/**
 * Normalized schema for nested distillery objects.
 * @type {schema.Entity}
 */
export const DISTILLERY_NESTED_SCHEMA = new schema.Entity('distilleries', {
  container: CONTAINER_SCHEMA,
  contexts: CONTEXT_LIST_SCHEMA,
});

/**
 * Noramlized schema for a list of nested distillery objects.
 * @type {schema.Array}
 */
export const DISTILLERY_NESTED_LIST_SCHEMA = new schema.Array(
  DISTILLERY_NESTED_SCHEMA,
);

/**
 * Normalized schema for a flat distillery object.
 * @type {schema.Entity}
 */
export const DISTILLERY_FLAT_SCHEMA = new schema.Entity('distilleries');

/**
 * Normalized schema for a list of flat distillery objects.
 * @type {schema.Entity}
 */
export const DISTILLERY_FLAT_LIST_SCHEMA = new schema.Entity(
  'distilleries',
  DISTILLERY_FLAT_SCHEMA,
);
