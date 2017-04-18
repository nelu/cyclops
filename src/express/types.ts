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

import { Router } from 'express';
/**
 * Possible environment variables for the project.
 */
export interface EnvironmentVariables {
  /** Current node environment. Values are DEV and PROD. */
  NODE_ENV?: string;
  /** Port number the Cyclops server should run on host localhost. */
  CYCLOPS_PORT?: number;
  /** Secret string the Cyclops server should use when creating sessions. */
  CYCLOPS_SESSION_SECRET?: string;
  /**
   * Base URL of the Cyphon instance this Cyclops instance should connect to.
   */
  CYPHON_URL?: string;
  /** URL path off of CYPHON_URL that connects to the Cyphon instance API. */
  CYPHON_API_PATH?: string;
  /**
   * How long the Cyclops instance should wait before any request made
   * to the Cyphon instance API times out.
   */
  CYPHON_API_TIMEOUT?: number;
  /**
   * Access token for accessing Mapbox services. This is required for
   * viewing any location based data.
   */
  MAPBOX_ACCESS_TOKEN?: string;
  /**
   * Firebase cloud messaging sender ID for push notifications.
   */
  CLOUD_SENDER_ID?: string;
}

export interface User {
  id: number;
  company: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

/**
 * Globals variables placed onto the react application window.
 */
export interface AppConfig {
  /** ID of the element that will contain the react application. */
  APP_CONTAINER_ID: string;
  /** User object of the currently authenticated user. */
  CURRENT_USER: User;
  /** URL of the Cyphon API proxy. */
  EXPRESS_CYPHON_PROXY_URL: string;
  /** URL of the Cyphon API this Cyclops instance points to. */
  CYPHON_API_URL: string;
  /** Access token for mapbox services. Required for any map actions. */
  MAPBOX_ACCESS_TOKEN: string;
  /** Base URL for the react application. Used for routing purposes. */
  APP_BASE_URL: string;
  /**
   * How long the react application should wait before a response to the
   * Cyphon API times out.
   */
  API_TIMEOUT: number;
  /** URL of the Cyphon Logo when accessed in a browser. */
  CYPHON_LOGO_URL: string;
  /** If chrome push notifications are enabled. */
  NOTIFICATIONS_ENABLED: boolean;
  /** Path of the notification service worker. */
  NOTIFICATIONS_SERVICE_WORKER_URL: string;
}

/** Interface for a Cyclops router. */
export interface CyclopsRouter {
  /** Express router instance. */
  router: Router;
}
