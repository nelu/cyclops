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
import {
  Router,
  RequestHandler,
  Response,
} from 'express';

// Local
import { CYPHON_API } from '../constants';
import { createDetailMessage } from '../helpers/errors';
import { CyclopsRouter } from '../types';

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Router that deals with logging out a user from a Cyclops instance.
 */
export class NotificationRouter implements CyclopsRouter {
  /**
   * Error message indicating that the push notification ID necessary for
   * getting notification information is not on the current user session.
   * @type {string}
   */
  public static PUSH_NOTIFICATION_ID_MISSING = 'Push notification id not ' +
    'present on current session.';

  /**
   * Error message indicating that the registration ID parameter is
   * missing from the POST data.
   * @type {string}
   */
  public static REGISTRATION_ID_MISSING = 'Registration id for push ' +
    'messaging missing from POST data.';

  /**
   * Error message indicating that the user is not currently logged in.
   * @type {string}
   */
  public static UNAUTHORIZED = 'User is not logged in.';

  /**
   * Returns a 403 response back to the client with the
   * PUSH_NOTIFICATION_ID_MISSING message and returns a rejected
   * promise with that same message.
   * @param res Express response.
   * @returns {Promise<never>}
   */
  public static sendPushNotificationIdMissingError(
    res: Response,
  ): Promise<never> {
    const message = NotificationRouter.PUSH_NOTIFICATION_ID_MISSING;

    res.status(403).json(createDetailMessage(message));

    return Promise.reject(message);
  }

  /**
   * Returns a 400 response back to the client with the
   * REGISTRATION_ID_MISSING message and returns a rejected
   * promise with that same message.
   * @param res Express response.
   * @returns {Promise<never>}
   */
  public static sendRegistrationIdMissingError(res: Response): Promise<never> {
    const message = NotificationRouter.REGISTRATION_ID_MISSING;

    res.status(400).json(createDetailMessage(message));

    return Promise.reject(message);
  }

  /**
   * Returns a 403 response back to the client with the UNAUTHORIZED message
   * and returns a rejected promise with that same message.
   * @param res Express response.
   * @returns {Promise<never>}
   */
  public static sendUnauthorizedError(res: Response): Promise<never> {
    const message = NotificationRouter.UNAUTHORIZED;

    res.status(403).json(createDetailMessage(message));

    return Promise.reject(message);
  }

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
   * Gets the newest notification from the Cyphon API.
   * @param req Express request.
   * @param res Express response.
   * @returns {Promise<void>}
   */
  public getNotification: RequestHandler = (req, res) => {
    const pushNotificationId = req.params.registration_id;
    const params = { registration_id: pushNotificationId };
    console.log(pushNotificationId);

    if (!pushNotificationId) {
      NotificationRouter.sendPushNotificationIdMissingError(res);
    }

    return CYPHON_API.get('/notifications/', { params })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  };

  /**
   * Subscribes the user to push notifications.
   * @param req Express request.
   * @param res Express response.
   * @returns {Promise<void>}
   */
  public subscribe: RequestHandler = (req, res) => {
    const { token } = req.session;

    if (!token) {
      NotificationRouter.sendUnauthorizedError(res);
    }

    const { registration_id } = req.body;

    console.log(registration_id);

    if (!registration_id) {
      NotificationRouter.sendRegistrationIdMissingError(res);
    }

    const headers = { Authorization: `JWT ${token}` };
    const data = { registration_id };

    return CYPHON_API.post('/notifications/subscribe/', data, { headers })
      .then((response) => {
        req.session.pushNotificationId = req.body.registration_id;
        res.json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  };

  /**
   * Configure this routers middleware.
   */
  private middleware(): void {}

  /**
   * Configure this routers routes.
   */
  private routes(): void {
    this.router.get('/', this.getNotification);
    this.router.post('/', this.subscribe);
  }
}