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
import * as express from 'express';
import { resolve } from 'path';
import * as proxy from 'http-proxy-middleware';

// Local
import { AppRouter } from './AppRouter';
import { LoginRouter } from './LoginRouter';
import { NotificationRouter } from './NotificationRouter';
import { isAuthenticated } from '../middlewares/auth';
import {
  getToken,
  redirectToLogin,
  unauthenticateSession
} from '../utils/auth';
import {
  DEFAULT_REDIRECT,
  APP_URL,
  LOGIN_URL,
  PROXY_URL,
} from '../constants';
import {
  WEBPACK_OUTPUT_PUBLIC_PATH,
  WEBPACK_OUTPUT_PATH,
  STATIC_URL,
  NOTIFICATIONS_ENABLED,
  CYPHON_API_URL,
} from '../../cyclops.config';

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Root router for the entire express application.
 */
export class RootRouter {
  /**
   * Regex string that matches the proxy url.
   * @type {string}
   */
  public static PROXY_URL_REGEX = `^${PROXY_URL}`;

  /** Express router object. */
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  /**
   * Default redirect for the express application if no routes match.
   * @param req Express request object.
   * @param res Express response object.
   */
  public redirect: express.RequestHandler = (req, res) => {
    return res.redirect(DEFAULT_REDIRECT);
  };

  /**
   * Logs a user out and redirects to the logout url specified in the
   * constructor.
   * @param req Express request object.
   * @param res Expres response object.
   */
  public logout: express.RequestHandler = (req, res) => {
    unauthenticateSession(req);
    redirectToLogin(req, res);
  };

  /**
   * Configure routes for this router.
   */
  private routes(): void {
    // Cyphon API Proxy.
    this.router.use(PROXY_URL, isAuthenticated, proxy({
      changeOrigin: true,
      target: CYPHON_API_URL,
      pathRewrite: {
        [RootRouter.PROXY_URL_REGEX]: '',
      },
      onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader('Authentication', `JWT ${getToken(req)}`);
      },
    }));

    // React application route.
    this.router.use(APP_URL, new AppRouter().router);

    // Login page.
    this.router.use(LOGIN_URL, new LoginRouter().router);

    // Logout page.
    this.router.get('/logout', isAuthenticated, this.logout);

    // Static assets from webpack.
    this.router.use(
      WEBPACK_OUTPUT_PUBLIC_PATH,
      express.static(WEBPACK_OUTPUT_PATH),
    );

    // Static assets in the express directory.
    this.router.use(
      STATIC_URL,
      express.static(resolve(__dirname, '../static')),
    );

    // Enable chrome push notifications if necessary
    if (NOTIFICATIONS_ENABLED) {
      this.router.use('/', new NotificationRouter().router);
    }

    // Redirect all other routes.
    this.router.get('*', this.redirect);
  }
}
