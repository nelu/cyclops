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
import { normalize, denormalize } from 'normalizr';

// Local
import { CONFIG } from '../../config';
import { NormalizedUserList, User } from './types';
import { userListSchema, userSchema } from './schemas';

/**
 * Regex used to find the user ID in a user URI.
 * @type {RegExp}
 */
const USER_ID_REGEX = /\/users\/(\d+)\//;

/**
 * Gets a user ID from a user URI.
 * @param uri URI to get the ID from.
 * @returns {number} ID of the user.
 */
export function getUserId(uri: string): number | undefined {
  const regexResults = USER_ID_REGEX.exec(uri);

  if (!regexResults || !regexResults[1]) return undefined;

  return _.toNumber(regexResults[1]);
}

/**
 * Gets the URI of a user by their elementId.
 * @param alertId Id of the alerts.
 * @returns {string} Alert URI.
 */
export function getUserUri(alertId: number) {
  return `${CONFIG.CYPHON_API_URL}/users/${alertId}/`;
}

/**
 * Normalizes a list of user objects.
 * @param users Users to normalize.
 * @returns {NormalizedUserList} Normalized list of users.
 */
export function normalizeUsers(users: User[]): NormalizedUserList {
  return normalize(users, userListSchema);
}

/**
 * Denormalizes a list of normalized users.
 * @param users Normalized list of users.
 * @returns {User[]} Denormalized list of users.
 */
export function denormalizeUsers(users: NormalizedUserList): User[] {
  return denormalize(users.result, userListSchema, users.entities);
}

/**
 * Gets a user object from a list of normalized users.
 * @param users Normalized users.
 * @param user ID of the user to get.
 * @returns {User | undefined} User object or undefined.
 */
export function getNormalizedUser
  (users: NormalizedUserList, user: number): User | undefined {
  return denormalize(user, userSchema, users.entities);
}

/**
 * Gets the full name of a user.
 * @param user
 * @returns {string}
 */
export function getUserFullName(user: User): string {
  return `${user.first_name} ${user.last_name}`;
}
