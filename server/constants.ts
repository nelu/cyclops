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
import axios, { AxiosInstance } from 'axios';
import { resolve as pathResolve } from 'path';

// Local
import {
  MAIN_CSS_FILE,
  CYPHON_API_URL,
  CYPHON_API_TIMEOUT,
  STATIC_URL,
} from '../cyclops.config';

/**
 * Axios instance that connects to a Cyphon API instance.
 * @type {AxiosInstance}
 */
export const CYPHON_API: AxiosInstance = axios.create({
  baseURL: CYPHON_API_URL,
  timeout: CYPHON_API_TIMEOUT,
});

/**
 * React Application URL
 * @type {string}
 */
export const APP_URL = '/app';

/**
 * Login URL.
 * @type {string}
 */
export const LOGIN_URL = '/login';

/**
 * Cyphon API proxy URL.
 * @type {string}
 */
export const PROXY_URL = '/api';

/**
 * Default redirect URL.
 * @type {string}
 */
export const DEFAULT_REDIRECT = APP_URL;

/**
 * URL route of the main CSS file when accessed from a browser.
 * @type {string}
 */
export const MAIN_CSS_URL = pathResolve(STATIC_URL, MAIN_CSS_FILE);

/**
 * URL route of the Cyphon Logo when accessed from a browser.
 * @type {string}
 */
export const CYPHON_LOGO_URL = pathResolve(STATIC_URL, 'img/Cyphon_Logo.svg');

/**
 * Notification service worker location.
 * @type {string}
 */
export const NOTIFICATIONS_SERVICE_WORKER_URL = '/sw.js';
