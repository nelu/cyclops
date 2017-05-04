import { User } from './api/users/types';
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

// Local
interface AppConfig {
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

/**
 * Extended window object that includes the injected application configuration
 * from the express server.
 */
interface ExtendedWindow extends Window {
  CONFIG: AppConfig;
}

export const DEFAULT_CONFIG: AppConfig = {
  APP_CONTAINER_ID: 'app',
  CURRENT_USER: {} as any,
  EXPRESS_CYPHON_PROXY_URL: '/api',
  CYPHON_API_URL: 'http://localhost:8000/',
  MAPBOX_ACCESS_TOKEN: '',
  APP_BASE_URL: '/app',
  API_TIMEOUT: 30000,
  CYPHON_LOGO_URL: '/static/img/Cyphon_Logo.svg',
  NOTIFICATIONS_ENABLED: false,
  NOTIFICATIONS_SERVICE_WORKER_URL: '/sw.js',
};

/**
 * Injected application configuration object from the express server.
 * @type {AppConfig}
 */
export const CONFIG = Object.assign(
  {},
  DEFAULT_CONFIG,
  (window as ExtendedWindow).CONFIG,
);
