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
import { Logger, LoggerInstance, transports } from 'winston';

// Local
import {} from '../constants';
import {
  PRODUCTION,
  CYCLOPS_PORT,
  NODE_ENV,
  CYPHON_URL,
  CYPHON_API_VERSION,
  CYPHON_API_TIMEOUT,
  NOTIFICATIONS_ENABLED,
  MAPBOX_ACCESS_TOKEN,
} from '../../cyclops.config';
import { getUser } from './auth';

// Set the remote-user token to the saved session token.
morgan.token('remote-user', (req) => {
  const user = getUser(req);

  return user ? `${user.first_name} ${user.last_name}` : '-';
});

/**
 * Logger object that helps with logging messages on the server.
 * @type {LoggerInstance}
 */
export const logger: LoggerInstance = new Logger({
  transports: [
    new transports.Console(),
  ],
});

/**
 * Logger middleware that logs server requests.
 * @type {RequestHandler}
 */
export const requestLogger: RequestHandler = PRODUCTION
  ? morgan('combined')
  : morgan('dev');

/**
 * Log helpful information whenever the server starts like the port the
 * server is running on and Cyclops specific environment variables.
 */
export function logServerStart(): void {
  logger.info([
    '\n',
    '---------------------------------------------------------\n',
    `Cyclops listening on localhost:${CYCLOPS_PORT}\n`,
    '---------------------------------------------------------\n',
    `NODE_ENV:              ${NODE_ENV}\n`,
    `CYPHON_URL:            ${CYPHON_URL}\n`,
    `CYPHON_API_VERSION:    ${CYPHON_API_VERSION}\n`,
    `CYPHON_API_TIMEOUT:    ${CYPHON_API_TIMEOUT}\n`,
    `NOTIFICATIONS_ENABLED: ${NOTIFICATIONS_ENABLED}\n`,
    `MAPBOX_TOKEN_SET:      ${!!MAPBOX_ACCESS_TOKEN}\n`,
  ].join(''));
}
