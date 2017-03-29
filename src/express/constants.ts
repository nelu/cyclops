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
import { config } from 'dotenv';
import * as _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import { resolve as pathResolve } from 'path';
import { resolve as urlResolve } from 'url';

// Local
import { EnvironmentVariables } from './types';
import {
  EXPRESS_SOURCE_DIRECTORY_PATH,
  ENV_FILE_PATH,
  CSS_COMPILATION_DIRECTORY,
  MAIN_CSS_FILE,
  STATIC_COMPILATION_DIRECTORY_PATH,
} from '../../constants';
import { BASE_WEBPACK_CONFIG } from '../../webpack/constants';
import { createManifestPath } from './utils/notifications';

// Place any environment variables stated in the .env file onto the node process.
config({ path: ENV_FILE_PATH });

/**
 * List of environment variables specific to Cyclops.
 * @type {string[]}
 */
export const ENVIRONMENT_VARIABLE_KEYS: string[] = [
  'CYCLOPS_SESSION_SECRET',
  'CYCLOPS_PORT',
  'CYPHON_API_PATH',
  'CYPHON_API_TIMEOUT',
  'CYPHON_URL',
  'MAPBOX_ACCESS_TOKEN',
  'NODE_ENV',
  'GCM_SENDER_ID',
];

/**
 * Object containing only the environment variables specific to Cyclops.
 * @type {EnvironmentVariables}
 */
export const PICKED_ENVIRONMENT_VARIABLES: EnvironmentVariables = _.pick(
  process.env, ENVIRONMENT_VARIABLE_KEYS,
) || {};

/**
 * Default values for the Cyclops environment variables.
 * @type {EnvironmentVariables}
 */
export const DEFAULT_ENVIRONMENT_VARIABLES: EnvironmentVariables = {
  CYCLOPS_SESSION_SECRET: 'nyan cat',
  CYCLOPS_PORT: 3000,
  CYPHON_API_PATH: '/api/v1',
  CYPHON_API_TIMEOUT: 30000,
  CYPHON_URL: 'http://localhost:8000/',
  MAPBOX_ACCESS_TOKEN: '',
  NODE_ENV: 'DEV',
  GCM_SENDER_ID: '',
};

/**
 * Environment variables passed in from the node process. If certain values
 * are blank, they're replaced with their default values specified in
 * DEFAULT_ENVIRONMENT_VARIABLES.
 * @type {EnvironmentVariables}
 */
export const ENV: EnvironmentVariables = _.assign(
  {}, DEFAULT_ENVIRONMENT_VARIABLES, PICKED_ENVIRONMENT_VARIABLES,
);

/**
 * If the current node environment is in production mode.
 * @type {boolean}
 */
export const IS_PRODUCTION: boolean = ENV.NODE_ENV === 'PROD';

/**
 * Base URL of the Cyphon API instance this Cyclops instance connects to.
 * @type {string}
 */
export const CYPHON_API_BASE_URL: string = urlResolve(
  ENV.CYPHON_URL, ENV.CYPHON_API_PATH,
);

/**
 * Axios instance that connects to a Cyphon API instance.
 * @type {AxiosInstance}
 */
export const CYPHON_API: AxiosInstance = axios.create({
  baseURL: CYPHON_API_BASE_URL,
  timeout: ENV.CYPHON_API_TIMEOUT,
});

export const NOTIFICATIONS_ENABLED = !!ENV.GCM_SENDER_ID;

/**
 * React Application URL
 * @type {string}
 */
export const APP_URL = '/app';

/**
 * Login URL
 * @type {string}
 */
export const LOGIN_URL = '/login';

/**
 * Logout URL
 * @type {string}
 */
export const LOGOUT_URL = '/logout';

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
 * Folder that contains express views in relation to the current directory.
 * @type {string}
 */
export const VIEWS_DIRECTORY = 'views';

/**
 * Folder that contains static content for express server in relation to the
 * current directory.
 * @type {string}
 */
export const STATIC_DIRECTORY = 'static';

/**
 * URL for static folder in the express source when accessed in the browser.
 * @type {string}
 */
export const STATIC_URL = '/static';

/**
 * Absolute path of the express views directory.
 * @type {string}
 */
export const VIEWS_DIRECTORY_PATH = pathResolve(
  EXPRESS_SOURCE_DIRECTORY_PATH, VIEWS_DIRECTORY,
);

/**
 * Absolute path of the express static directory.
 * @type {string}
 */
export const STATIC_DIRECTORY_PATH = pathResolve(
  EXPRESS_SOURCE_DIRECTORY_PATH, STATIC_DIRECTORY,
);

/**
 * URL route of the main CSS file when accessed from a browser.
 * @type {string}
 */
export const MAIN_CSS_URL = pathResolve(
  STATIC_URL, CSS_COMPILATION_DIRECTORY, MAIN_CSS_FILE,
);

/**
 * URL route of the Cyphon Logo when accessed from a browser.
 * @type {string}
 */
export const CYPHON_LOGO_URL = pathResolve(STATIC_URL, 'img/Cyphon_Logo.svg');

/**
 * Notification service worker location.
 * @type {string}
 */
export const NOTIFICATIONS_SERVICE_WORKER_URL = pathResolve(
  STATIC_URL,
  'js/notifications.js',
);

// Element ID of the container for the react application.
export const APP_CONTAINER_ID = 'app';
// URL of the app webpack bundle when accessed from a browser.
export const APP_BUNDLE_URL = pathResolve(
  STATIC_URL, BASE_WEBPACK_CONFIG.output.filename,
);
