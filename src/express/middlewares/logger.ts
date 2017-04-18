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
import { RequestHandler } from 'express';
import * as morgan from 'morgan';

// Local
import {
  IS_PRODUCTION,
  ENV,
  NOTIFICATIONS_ENABLED,
} from '../constants';
import { logger } from '../helpers/logger';

/**
 * Returns logger middleware for requests.
 * @returns {RequestHandler}
 */
export function getRequestLogger(): RequestHandler {
  // Set the remote-user token to the saved session token.
  morgan.token('remote-user', (req) => {
    const user = req.session.user;

    return user ? `${user.first_name} ${user.last_name}` : '-';
  });

  // If not production, return developer log format.
  if (!IS_PRODUCTION) { return morgan('dev'); }

  // Return apache combined log format.
  return morgan('combined');
}

/**
 * Log helpful information whenever the server starts like the port the
 * server is running on and Cyclops specific environment variables.
 */
export function logServerStart(): void {
  logger.info([
    '\n',
    '---------------------------------------------------------\n',
    `Cyclops listening on localhost:${ENV.CYCLOPS_PORT}\n`,
    '---------------------------------------------------------\n',
    `NODE_ENV:              ${ENV.NODE_ENV}\n`,
    `CYPHON_URL:            ${ENV.CYPHON_URL}\n`,
    `CYPHON_API_PATH:       ${ENV.CYPHON_API_PATH}\n`,
    `CYPHON_API_TIMEOUT:    ${ENV.CYPHON_API_TIMEOUT}\n`,
    `NOTIFICATIONS_ENABLED: ${NOTIFICATIONS_ENABLED}\n`,
    `MAPBOX_TOKEN_SET:      ${!!ENV.MAPBOX_ACCESS_TOKEN}\n`,
  ].join(''));
}
