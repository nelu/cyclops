
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
import { User } from '../../../services/users/types';
import { getUserFullName } from '../../../services/users/utils/getUserFullName';
import { CONFIG } from '../../../config';

/**
 * Creates a comment string explaining that an alert was assigned from a
 * user to another user.
 * @param toUser User the alert is being assigned to.
 * @param fromUser User the alert is being unassigned from.
 */
export function createAssignedUpdateComment(
  toUser?: User,
  fromUser?: User,
): string {
  const fromName = fromUser
    ? ` from ${getUserFullName(fromUser)}`
    : '';

  if (!toUser) {
    return `Unassigned${fromName || ' from nobody'}.`;
  }

  const isSelf = toUser.id === CONFIG.CURRENT_USER.id;
  const toName = isSelf
    ? 'self'
    : getUserFullName(toUser);

  return `Assigned${fromName} to ${toName}.`;
}