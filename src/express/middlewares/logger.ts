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
import * as _ from 'lodash';

// Local
import {
  IS_PRODUCTION,
  ENV,
  ENVIRONMENT_VARIABLE_KEYS,
} from '../constants';
import { logger } from '../helpers/logger';

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Sensitive environment variables that should be left out of the startup log.
 * @type {string[]}
 */
export const SENSITIVE_ENVIRONMENT_VARIABLES: string[] = [
  'CYCLOPS_SESSION_SECRET',
  'MAPBOX_ACCESS_TOKEN',
];

// --------------------------------------------------------------------------
// Methods
// --------------------------------------------------------------------------

/**
 * Returns logger middleware for requests.
 * @returns {RequestHandler}
 */
export function getRequestLogger(): RequestHandler {
  // If not production, return developer log format.
  if (!IS_PRODUCTION) { return morgan('dev'); }

  // Set the remote-user token to the saved session token.
  morgan.token('remote-user', (req) => {
    const user = req.session.user;

    return user ? `${user.first_name} ${user.last_name}` : '-';
  });

  // Return apache combined log format.
  return morgan('combined');
}

/**
 * Log helpful information whenever the server starts like the port the
 * server is running on and Cyclops specific environment variables.
 */
export function logServerStart(): void {
  const serverStartLog = [
    '\n',
    '------------------------------------------------------------------\n',
    `Express Server listening on localhost:${ENV.CYCLOPS_PORT}\n`,
    '------------------------------------------------------------------\n',
    '\n',
    'Cyclops Environment Variables\n',
    '-----------------------------\n',
  ];

  const variableSpacing: number = getMaxStringLength(ENVIRONMENT_VARIABLE_KEYS);

  _.forEach(ENV, (value, variable) => {
    if (!_.includes(SENSITIVE_ENVIRONMENT_VARIABLES, variable)) {
      const spaces: string = getSpaceString(variable, variableSpacing);

      serverStartLog.push(`${variable}:${spaces}${value}\n`);
    }
  });

  logger.info(serverStartLog.join(''));
}

// --------------------------------------------------------------------------
// Private Methods
// --------------------------------------------------------------------------

/**
 * Returns a string of spaces by subtracting the maximum number of allowed
 * spaces from the length of a given string.
 * @param variable String to subtract length from.
 * @param maxSpacing Max number of spaces to allow.
 * @returns {string}
 */
function getSpaceString(variable: string, maxSpacing: number): string {
  const numOfSpaces: number = maxSpacing - variable.length;
  let spaces: string = '';
  let ii: number = 0;

  for (ii; ii < numOfSpaces; ii++) { spaces += ' '; }

  return spaces;
}

/**
 * Retrieve the longest string length from a list of strings.
 * @param variables List of strings.
 * @returns {number} Longest string length.
 */
function getMaxStringLength(variables: string[]): number {
  let maxSpacing: number = 0;

  variables.forEach((variable) => {
    const length: number = variable.length;

    if (length > maxSpacing) { maxSpacing = length; }
  });

  return maxSpacing;
}
