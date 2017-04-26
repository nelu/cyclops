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
import { NOTIFICATIONS_SERVICE_WORKER_URL } from '../constants';
import { GCM_SENDER_ID } from '../../cyclops.config';

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Router that deals with logging out a user from a Cyclops instance.
 */
export class NotificationRouter {
  /**
   * JSON for the manifest.json file.
   * @type {Object}
   */
  public static MANIFEST_JSON = {
    gcm_sender_id: GCM_SENDER_ID,
    manifest_version: 2,
    name: 'Cyphon Push Notifications',
    version: '0.2',
  };

  /**
   * Express router object for this router.
   */
  public router: express.Router;

  /**
   * Sets up the router object, middleware, and routes for this router.
   */
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  /**
   * Returns the JSON of the manifest file for push notifications.
   * @param req Express request.
   * @param res Express response.
   * @returns {Response} manifest.json file.
   */
  public getManifest: express.RequestHandler = (req, res) => {
    return res.json(NotificationRouter.MANIFEST_JSON);
  };

  /**
   * Configure this routers routes.
   */
  private routes(): void {
    this.router.get('/manifest.json', this.getManifest);
    this.router.use(
      NOTIFICATIONS_SERVICE_WORKER_URL,
      express.static(resolve(__dirname, '../static/js/sw.js')),
    );
  }
}