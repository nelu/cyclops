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
import { AppRouter } from './AppRouter';

import { cyphonApiProxy } from '../middlewares/proxy';
import { LoginRouter } from './LoginRouter';
import { LogoutRouter } from './LogoutRouter';
import {
  DEFAULT_REDIRECT,
  APP_URL,
  LOGIN_URL,
  LOGOUT_URL,
  PROXY_URL,
} from '../constants';

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Root router for the entire express application.
 */
export class RootRouter {
  /**
   * Express router object.
   */
  public router: Router;

  constructor() {
    this.router = Router();
    this.middleware();
    this.routes();
  }

  /**
   * Default redirect for the express application if no routes match.
   * @param req Express request object.
   * @param res Express response object.
   */
  public redirect: RequestHandler = (req, res) => {
    return res.redirect(DEFAULT_REDIRECT);
  };

  /**
   * Configure middleware for this router.
   */
  private middleware(): void {
    this.router.use(PROXY_URL, cyphonApiProxy);
  }

  /**
   * Configure routes for this router.
   */
  private routes(): void {
    // React application route.
    this.router.use(APP_URL, new AppRouter().router);
    // Login page.
    this.router.use(LOGIN_URL, new LoginRouter().router);
    // Logout page.
    this.router.use(LOGOUT_URL, new LogoutRouter().router);
    // Redirect all other routes.
    this.router.get('*', this.redirect);
  }
}
