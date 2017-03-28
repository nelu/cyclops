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
import { writeFile } from 'jsonfile';
import { resolve } from 'path';

// Local
import { logger } from './logger';

/**
 * Name of the created manifest file.
 * @type {string}
 */
const MANIFEST_NAME = 'manifest.json';

/**
 * Base JSON object to create the manifest file with.
 * @type {any}
 */
const MANIFEST_BASE_JSON = {
  manifest_version: 2,
  name: 'Cyphon Push Notifications',
  version: '0.2',
};

/**
 * Creates a manifest.json file for chrome push notifications.
 * @param gcmSenderId
 * @param path
 */
export function createManifest(gcmSenderId: string, path: string) {
  const json = Object.assign({}, MANIFEST_BASE_JSON, {
    gcm_sender_id: gcmSenderId,
  });

  writeFile(path, json, { spaces: 2 }, (err) => {
    if (err) { logger.error(err.toString()); }
    else { logger.info(`Wrote manifest.json to ${path}`); }
  });
}

/**
 * Creates a file path with the manifest.json file name.
 * @param path Base path to place the manifest.json file in.
 * @returns {string}
 */
export function createManifestPath(path: string): string {
  return resolve(path, MANIFEST_NAME);
}
