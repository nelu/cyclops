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

// Local
import { AppRouter } from './AppRouter';

import { cyphonApiProxy } from '../middlewares/proxy';
import { LoginRouter } from './LoginRouter';
import { LogoutRouter } from './LogoutRouter';
import { NotificationRouter } from './NotificationRouter';
import {
  DEFAULT_REDIRECT,
  APP_URL,
  LOGIN_URL,
  LOGOUT_URL,
  PROXY_URL,
  ENV,
  NOTIFICATIONS_ENABLED,
} from '../constants';
import { ROOT_DIRECTORY_PATH } from '../../../constants';

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Root router for the entire express application.
 */
export class RootRouter {
  /**
   * JSON for the manifest.json file.
   * @type {Object}
   */
  public static MANIFEST_JSON = {
    gcm_sender_id: ENV.CLOUD_SENDER_ID,
    manifest_version: 2,
    name: 'Cyphon Push Notifications',
    version: '0.2',
  };

  /**
   * Express router object.
   */
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.middleware();
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
   * Returns the JSON of the manifest file for push notifications.
   * @param req Express request.
   * @param res Express response.
   * @returns {Response} manifest.json file.
   */
  public getManifest: express.RequestHandler = (req, res) => {
    return res.json(RootRouter.MANIFEST_JSON);
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
    // Enable chrome push notifications if necessary
    if (NOTIFICATIONS_ENABLED) {
      this.router.use('/notifications', new NotificationRouter().router);
      this.router.get('/manifest.json', this.getManifest);
      this.router.use(
        '/sw.js',
        express.static(resolve(ROOT_DIRECTORY_PATH, 'src/sw.js')),
      );
    }
    // Redirect all other routes.
    this.router.get('*', this.redirect);
  }
}
