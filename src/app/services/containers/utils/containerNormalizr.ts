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

// Local
import { Dictionary } from '~/types/object';
import { ContainerFlat } from '~/services/containers/types';
import { getEntities } from '~/utils/normalizrUtils';
import { CONTAINER_ENTITY_KEY } from '~/services/containers/constants';

/**
 * Returns the container entities from a dictionary of normalized entities.
 * @param entities Normalized entities object.
 * @returns {ContainerFlat[]}
 */
export function getContainerEntities(entities: Dictionary<any>): ContainerFlat[] {
  return getEntities<ContainerFlat>(entities, CONTAINER_ENTITY_KEY);
}
