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

/** Cyphon User object. */
export interface User {
  /** Unique ID. */
  id: number;
  /** Company associated with user. */
  company: number;
  /** User's email. */
  email: string;
  /** User's first name. */
  first_name: string;
  /** User's last name */
  last_name: string;
  /** If the user has staff permissions. */
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
  /** URL of the cyphon admin page. */
  ADMIN_URL: string;
}
