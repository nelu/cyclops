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
import { Response, Request } from 'express';

// Local
import { User } from '../types';
import { LOGIN_URL } from '../constants';

/**
 * Authenticates the current session.
 * @param req Express request.
 * @param token JWT authentication token.
 * @param user User associated with the token.
 */
export function authenticateSession(
  req: Request,
  token: string,
  user: User,
): void {
  if (req.session) {
    req.session.token = token;
    req.session.user = user;
  }
}

/**
 * Determines if the current session is authenticated.
 * @param req Express request.
 * @returns {boolean} If the session is authenticated.
 */
export function isAuthenticated(req: Request): boolean {
  if (!req.session) { return false; }

  return !!req.session.token && !!req.session.user;
}

/**
 * Unauthenticates the current session.
 * @param req Express request.
 */
export function unauthenticateSession(req: Request): void {
  if (req.session) {
    delete req.session.token;
    delete req.session.user;
  }
}

/**
 * Redirects the user to the login page with the requested url set as
 * the next parameter in the url query.
 */
export function redirectToLogin(req: Request, res: Response): void {
  const isLogout = req.originalUrl === '/logout';
  const nextUrl = isLogout
    ? encodeURIComponent('/app')
    : encodeURIComponent(req.originalUrl);
  const redirectUrl = `${LOGIN_URL}?next=${nextUrl}`;

  res.redirect(redirectUrl);
}

export function getToken(req: Request): string {
  return req.session && req.session.token ? req.session.token : '';
}

export function getUser(req: Request): User | undefined {
  return req.session ? req.session.user : undefined;
}
