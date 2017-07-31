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

import { getConfig } from '~/config';
import { Dictionary } from '~/types/object';

export interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
}

export type SemanticVersionRange = [SemanticVersion, SemanticVersion];

const VERSION_WILDCARD = '*';

/**
 * Cyclops versions matched to the Cyphon versions that they work with.
 * @type {Dictionary<string>}
 */
export const VERSION_MATCHING: Dictionary<string> = {
  '0.0.0:0.4.1': '0.0.0:1.3.0',
  '0.4.2:*': '1.4.0:*',
};

/**
 * Parses the version number from a string. If there is none, or if the
 * number is a wildcard, it returns Infinity.
 * @param {string} versionNumberString
 * @returns {number} Parsed integer or infinity.
 */
function parseVersionNumber(versionNumberString: string | undefined): number {
  if (!versionNumberString || versionNumberString === VERSION_WILDCARD) {
    return Infinity;
  }

  return parseInt(versionNumberString, 10);
}

/**
 * Parses a semantic version object from a string representing a semantic
 * version.
 * @param {string} semanticVersionString
 * @returns {SemanticVersion}
 */
export function parseSemanticVersion(semanticVersionString: string): SemanticVersion {
  const splitVersionNumbers = semanticVersionString.split('.');
  const major = parseVersionNumber(splitVersionNumbers[0]);
  const minor = parseVersionNumber(splitVersionNumbers[1]);
  const patch = parseVersionNumber(splitVersionNumbers[2]);

  return { major, minor, patch };
}

/**
 * Parses a string that represents a range of semantic versions into an
 * array of those two versions.
 * @param {string} semanticVersionRangeString
 * @returns {SemanticVersionRange}
 */
function parseSemanticVersionRange(
  semanticVersionRangeString: string,
): SemanticVersionRange {
  const parsedVersionRepresentation = semanticVersionRangeString
    .split(':');
  const oldest = parseSemanticVersion(parsedVersionRepresentation[0]);
  const newest = parseSemanticVersion(parsedVersionRepresentation[1]);

  return [oldest, newest];
}

/**
 * Determines if a semantic version matches a version between two
 * semantic version ranges.
 * @param {SemanticVersion} semanticVersion
 * @param {SemanticVersionRange} semanticVersionRange
 * @returns {boolean}
 */
function semanticVersionMatchesSemanticVersionRange(
  semanticVersion: SemanticVersion,
  semanticVersionRange: SemanticVersionRange,
): boolean {
  const majorMatches =
    semanticVersionRange[0].major <= semanticVersion.major &&
    semanticVersion.major <= semanticVersionRange[1].major;
  const minorMatches =
    semanticVersionRange[0].minor <= semanticVersion.minor &&
    semanticVersion.minor <= semanticVersionRange[1].minor;
  const patchMatches =
    semanticVersionRange[0].patch <= semanticVersion.patch &&
    semanticVersion.patch <= semanticVersionRange[1].patch;

  return majorMatches && minorMatches && patchMatches;
}

/**
 * Returns the Cyphon semantic version range that matches a Cyclops
 * semantic version.
 * @param {SemanticVersion} cyclopsSemanticVersion
 * @returns {SemanticVersionRange}
 */
export function getMatchingCyphonSemanticVersionRange(
  cyclopsSemanticVersion: SemanticVersion,
  ): SemanticVersionRange | undefined {
  const matchingVersion = Object
    .keys(VERSION_MATCHING)
    .find((cyclopsSemanticVersionRangeString) => {
      const cyclopsSemanticVersionRange = parseSemanticVersionRange(
        cyclopsSemanticVersionRangeString);

      return semanticVersionMatchesSemanticVersionRange(
        cyclopsSemanticVersion, cyclopsSemanticVersionRange);
    });

  return matchingVersion
    ? parseSemanticVersionRange(VERSION_MATCHING[matchingVersion])
    : undefined;
}

/**
 * Determines if the current Cyclops version matches the current Cyphon
 * version.
 * @returns {boolean}
 * @throws {TypeError} If the Cyclops version is missing.
 * @throws {TypeError} If the Cyphon version is missing.
 * @throws {TypeError} If there is no matching Cyphon version range for
 *   the current Cyclops version.
 */
export function cyclopsVersionMatchesCyphonVersion(): boolean {
  const configuration = getConfig();

  if (!configuration.CYCLOPS_VERSION) {
    throw TypeError('Missing Cyclops version from configuration object.');
  }

  if (!configuration.CYPHON_VERSION) {
    throw TypeError('Missing Cyphon version from configuration object.');
  }

  const cyclopsSemanticVersion = parseSemanticVersion(
    configuration.CYCLOPS_VERSION);
  const matchingCyphonSemanticVersionRange =
    getMatchingCyphonSemanticVersionRange(cyclopsSemanticVersion);

  if (!matchingCyphonSemanticVersionRange) {
    throw new TypeError(`Could not find matching Cyphon version for Cyclops ' +
      'version ${configuration.CYCLOPS_VERSION}.`);
  }

  const cyphonSemanticVersion = parseSemanticVersion(
    configuration.CYPHON_VERSION);

  return semanticVersionMatchesSemanticVersionRange(
    cyphonSemanticVersion, matchingCyphonSemanticVersionRange);
}