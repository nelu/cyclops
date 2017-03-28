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
import {
  ENV,
  MAIN_CSS_URL,
  CYPHON_LOGO_URL,
  APP_CONTAINER_ID,
  APP_BUNDLE_URL,
  PROXY_URL,
  APP_URL,
  CYPHON_API_BASE_URL,
  NOTIFICATIONS_ENABLED,
  NOTIFICATIONS_SERVICE_WORKER_URL,
} from '../constants';
import { isAuthenticated } from '../middlewares/auth';
import { AppConfig } from '../types';

// --------------------------------------------------------------------------
// Interfaces
// --------------------------------------------------------------------------

/**
 * Options for rendering the application template.
 */
interface AppTemplateOptions {
  /**
   * Injected application configuration variables turned into a JSON string.
   */
  CONFIG: string;
  /**
   * Element ID of the container for the react application.
   */
  APP_CONTAINER_ID: string;
  /**
   * URL of the main css file.
   */
  MAIN_CSS_URL: string;
  /**
   * URL of the react application bundle.
   */
  APP_BUNDLE_URL: string;
}

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Router for the react application.
 */
export class AppRouter {
  /**
   * Name of the template to use for the application.
   * @type {string}
   */
  public static APP_TEMPLATE = 'app';

  /**
   * Express router object.
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
   * Renders the react application and injects global react application
   * configuration onto the window object.
   * @param req Express request object.
   * @param res Express response object.
   */
  public renderApp: RequestHandler = (req, res) => {
    // React application configuration.
    const appConfig: AppConfig = {
      API_TIMEOUT: ENV.CYPHON_API_TIMEOUT,
      APP_BASE_URL: APP_URL,
      APP_CONTAINER_ID,
      CURRENT_USER: req.session.user,
      CYPHON_API_URL: CYPHON_API_BASE_URL,
      EXPRESS_CYPHON_PROXY_URL: PROXY_URL,
      MAPBOX_ACCESS_TOKEN: ENV.MAPBOX_ACCESS_TOKEN,
      CYPHON_LOGO_URL,
      NOTIFICATIONS_ENABLED,
      NOTIFICATIONS_SERVICE_WORKER_URL,
    };
    const templateOptions: AppTemplateOptions = {
      APP_BUNDLE_URL,
      APP_CONTAINER_ID: appConfig.APP_CONTAINER_ID,
      // Configuration is stringified so it can be parsed as an object in
      // the handlebars view.
      CONFIG: JSON.stringify(appConfig),
      MAIN_CSS_URL,
    };

    return res.render(AppRouter.APP_TEMPLATE, templateOptions);
  };

  /**
   * Configure express middleware for this router.
   */
  private middleware(): void {
    this.router.use('/*', isAuthenticated);
  }

  /**
   * Configure routes for this router.
   */
  private routes(): void {
    this.router.get('/*', this.renderApp);
  }
}
