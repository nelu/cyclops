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
import { Router, RequestHandler } from 'express';

// Local
import { isAuthenticated } from '../middlewares/auth';
import { LOGIN_URL } from '../constants';

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Router that deals with logging out a user from a Cyclops instance.
 */
export class LogoutRouter {
  /**
   * Express router object for this router.
   */
  public router: Router;

  /**
   * Sets up the router object, middleware, and routes for this router.
   */
  constructor() {
    this.router = Router();
    this.middleware();
    this.routes();
  }

  /**
   * Logs a user out and redirects to the logout url specified in the
   * constructor.
   * @param req Express request object.
   * @param res Expres response object.
   */
  public logout: RequestHandler = (req, res) => {
    // Remove all session variables.
    req.session.token = undefined;
    req.session.user = undefined;
    req.session.authenticated = false;

    // Redirect to specified url.
    res.redirect(LOGIN_URL);
  };

  /**
   * Configure this routers middleware.
   */
  private middleware(): void {
    this.router.use('/', isAuthenticated);
  }

  /**
   * Configure this routers routes.
   */
  private routes(): void {
    this.router.get('/', this.logout);
  }
}
