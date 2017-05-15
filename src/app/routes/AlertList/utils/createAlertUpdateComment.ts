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
import {
  Alert,
  AlertUpdateRequest,
} from '../../../services/alerts/types';
import { NormalizedUserList } from '../../../services/users/types';
import { createLevelUpdateComment } from './createLevelUpdateComment';
import { createAssignedUpdateComment } from './createAssignedUpdateComment';

export function createAlertUpdateComment(
  fields: AlertUpdateRequest,
  alert: Alert,
  users: NormalizedUserList,
): string {
  const comments: string[] = [];
  const keys = Object.keys(fields);

  keys.forEach((key) => {
    const value = (fields as any)[key];

    switch (key) {
      case 'level':
        if (value) {
          comments.push(createLevelUpdateComment(alert.level, value));
        }
        break;

      case 'assigned_user':
        if (value) { comments.push(createAssignedUpdateComment()); }
        break;

      case 'outcome':
        if (value) { comments.push(''); }
        break;

      default:
        break;
    }
  });

  return comments.join('\n');
}
