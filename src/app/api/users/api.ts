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
import { APIList } from '../types';

// Local
import * as cyphon from '../api';
import { User } from './types';

/**
 * Gets a user object by it's id.
 * @param userId ID of the user object to get.
 * @param cache If the result should be cached.
 * @returns {Promise<User>}
 */
export function fetchUser(
  userId: number,
  cache?: boolean,
): Promise<User> {
  return cyphon.get(`/users/${userId}/`, { cache });
}

/**
 * Returns an array of users that match the given parameters.
 * @return {Promise<APIList<User>>}
 */
export function fetchUserList(): Promise<APIList<User>> {
  return cyphon.get('/users/');
}

/**
 * Returns all the users.
 * @returns {Promise<User[]>}
 */
export function fetchAllUsers(): Promise<User[]> {
  return cyphon.getAll('/users/');
}
