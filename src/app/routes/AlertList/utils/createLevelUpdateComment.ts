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
import { AlertLevelChoices } from '../../../services/alerts/types';
import { getLevelDisplayName } from '../../../services/alerts/utils/getLevelDisplayName';

/**
 * Creates a message explaining that the current user changed an alert's level
 * to the specified value.
 * @param fromLevel Alert level the user changed from.
 * @param toLevel Alert level the user changed to.
 * @returns {string} Comment describing the alert update.
 */
export function createLevelUpdateComment(
  fromLevel: AlertLevelChoices,
  toLevel: AlertLevelChoices,
): string {
  const displayFrom = getLevelDisplayName(fromLevel);
  const displayTo = getLevelDisplayName(toLevel);

  return `Changed level from ${displayFrom} to ${displayTo}.`;
}
