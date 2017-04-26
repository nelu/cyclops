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
import { RequestHandler } from 'express';

// Local
import { DEFAULT_REDIRECT } from '../constants';
import * as authUtils from '../utils/auth';

/**
 * Determines if a user is authenticated. If the are, it passes control
 * to the next RequestHandler. If they aren't, it redirects to the login
 * url and sets the next query parameter to the url the user was trying
 * to visit.
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next function.
 */
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (authUtils.isAuthenticated(req)) { next(); }
  else { authUtils.redirectToLogin(req, res); }
};

/**
 * Determines if a user is not authenticated. If they aren't, it passes
 * control to the next RequestHandler. If they are, it redirects them to
 * DEFAULT_REDIRECT specified in the express constants.
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next function.
 */
export const isNotAuthenticated: RequestHandler = (req, res, next) => {
  if (!authUtils.isAuthenticated(req)) { next(); }
  else { res.redirect(DEFAULT_REDIRECT); }
};
