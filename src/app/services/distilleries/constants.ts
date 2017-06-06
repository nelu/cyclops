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

// Local
import { CONTAINER_SCHEMA } from '~/services/containers/constants';
import { CONTEXT_FILTER_LIST_SCHEMA } from '~/services/contexts/schemas';

const CONTEXT_FLAT_SCHEMA = new schema.Entity('contexts', {
  filters: CONTEXT_FILTER_LIST_SCHEMA,
});

const CONTEXT_FLAT_LIST_SCHEMA = new schema.Array(CONTEXT_FLAT_SCHEMA);

/**
 * Normalizr schema of a distillery object.
 * @type {schema.Entity}
 */
export const DISTILLERY_SCHEMA = new schema.Entity('distilleries', {
  container: CONTAINER_SCHEMA,
  contexts: CONTEXT_FLAT_LIST_SCHEMA,
});

/**
 * Normalizr schema of a list of distillery objects.
 * @type {schema.Array}
 */
export const DISTLLERY_LIST_SCHEMA = new schema.Array(DISTILLERY_SCHEMA);
