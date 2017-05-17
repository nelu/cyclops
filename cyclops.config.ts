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
import { resolve as resolvePath } from 'path';
import { resolve as resolveURL } from 'url';
import { config } from 'dotenv';

config({ path: resolvePath(__dirname, 'cyclops.env') });

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Flag indicating that the server is running in a development environment.
 * @type {string}
 */
const DEVELOPMENT_FLAG = 'development';

/**
 * Flag indicating that the server is running in a production environment.
 * @type {string}
 */
const PRODUCTION_FLAG = 'production';

/**
 * Default localhost link to Cyphon.
 * @type {string}
 */
const CYPHON_LOCALHOST = 'http://localhost:8000/';

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/**
 * Session secret for server.
 * @type {string}
 */
export const CYCLOPS_SESSION_SECRET = process.env.CYCLOPS_SESSION_SECRET || 'keyboard cat';

/**
 * Port the server will listen on.
 * @type {number}
 */
export const CYCLOPS_PORT = process.env.CYCLOPS_PORT || 3000;

/**
 * Cyphon API version the server will proxy to.
 * @type {number}
 */
export const CYPHON_API_VERSION = process.env.CYPHON_API_VERSION || 1;

/**
 * Time in milliseconds it takes for calls to Cyphon to timeout.
 * @type {number}
 */
export const CYPHON_API_TIMEOUT = process.env.CYPHON_API_TIMEOUT
  ? parseInt(process.env.CYPHON_API_TIMEOUT, 10)
  : 30000;

/**
 * URL of the Cyphon instance to connect to.
 * @type {string}
 */
export const CYPHON_URL = process.env.CYPHON_URL || CYPHON_LOCALHOST;

/**
 * URL of Cyphon that a user can reach from their browser. This has a
 * possibility of being different from the Cyphon URL because
 * the Cyclops instance could be communicating to the API over
 * a different network, such as a docker network.
 * @type {string}
 */
export const CYPHON_EXTERNAL_URL = CYPHON_URL === CYPHON_LOCALHOST
  ? CYPHON_LOCALHOST
  : process.env.CYPHON_EXTERNAL_URL || '';

/**
 * Admin URL of the Cyphon instance.
 * @type {string}
 */
export const CYPHON_ADMIN_URL = CYPHON_EXTERNAL_URL
  ? resolveURL(CYPHON_EXTERNAL_URL, '/admin/')
  : '';

/**
 * Access token for mapbox services. Needed to display maps.
 * @type {string}
 */
export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '';

/**
 * Current running environment.
 * @type {string}
 */
export const NODE_ENV = process.env.NODE_ENV || DEVELOPMENT_FLAG;

/**
 * Sender ID for push notifications.
 * @type {string}
 */
export const GCM_SENDER_ID = process.env.GCM_SENDER_ID || '';

/**
 * If push notifications are enabled.
 * @type {boolean}
 */
export const NOTIFICATIONS_ENABLED = !!GCM_SENDER_ID;

/**
 * If the current running environment is production.
 * @type {boolean}
 */
export const PRODUCTION = NODE_ENV === PRODUCTION_FLAG;

/**
 * File name of the main css file.
 * @type {string}
 */
export const MAIN_CSS_FILE = 'css/styles.css';

/**
 * API URL path off the base Cyphon URL.
 * @type {string}
 */
export const CYPHON_API_PATH = `/api/v${CYPHON_API_VERSION}`;

/**
 * URL of the Cyphon API to proxy to.
 * @type {string}
 */
export const CYPHON_API_URL = resolveURL(CYPHON_URL, CYPHON_API_PATH);

/**
 * URL that static assets are served from.
 * @type {string}
 */
export const STATIC_URL = '/static/';

/**
 * Output path for webpack.
 * @type {string}
 */
export const WEBPACK_OUTPUT_PATH = resolvePath(__dirname, 'dist');

/**
 * Output filename for webpack bundle.
 * @type {string}
 */
export const WEBPACK_OUTPUT_FILENAME = 'js/bundle.js';

/**
 * URL the webpack assets are served from on the server.
 * @type {string}
 */
export const WEBPACK_OUTPUT_PUBLIC_PATH = STATIC_URL;
