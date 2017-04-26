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
import { CONFIG } from '../../config';
import { AlertListItem, NormalizedAlertListItems } from './types';
import { ALERT_LIST_ITEM_SCHEMA } from './schemas';
import { normalize } from 'normalizr';

/**
 * Returns the alerts URI of a given alerts ID.
 * @param {Number} id The ID of the alerts.
 * @return {String} The URI of the alerts.
 */
export function getAlertUri(id: number) {
  return `${CONFIG.CYPHON_API_URL}/alerts/${id}/`;
}

// export function updateNormazliedAlertListItem()
//
export function normalizeAlertListItems(
  alerts: AlertListItem[],
): NormalizedAlertListItems {
  return normalize(alerts, ALERT_LIST_ITEM_SCHEMA);
}