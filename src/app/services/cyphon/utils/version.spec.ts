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
import * as sinon from 'sinon';
import * as chai from 'chai';

// Local
import * as version from './version';

describe('version', () => {
  describe('getMatchingCyphonSemanticVersionRange()', () => {
    it('should return the range that matches a specified start and ' +
      'end point', () => {
      const cyclopsVersion = version.parseSemanticVersion('0.1.0');
      const range = version.getMatchingCyphonSemanticVersionRange(cyclopsVersion);

      expect((range as version.SemanticVersionRange)[0].major).to.equal(0);
      expect((range as version.SemanticVersionRange)[0].minor).to.equal(0);
      expect((range as version.SemanticVersionRange)[0].patch).to.equal(0);
      expect((range as version.SemanticVersionRange)[1].major).to.equal(1);
      expect((range as version.SemanticVersionRange)[1].minor).to.equal(3);
      expect((range as version.SemanticVersionRange)[1].patch).to.equal(0);
    });

    it('should return the range that matches a specified start and ' +
      'infinite end point', () => {
      const cyclopsVersion = version.parseSemanticVersion('0.5');
      const range = version.getMatchingCyphonSemanticVersionRange(cyclopsVersion);

      expect((range as version.SemanticVersionRange)[0].major).to.equal(1);
      expect((range as version.SemanticVersionRange)[0].minor).to.equal(4);
      expect((range as version.SemanticVersionRange)[0].patch).to.equal(0);
      expect((range as version.SemanticVersionRange)[1].major).to.equal(Infinity);
      expect((range as version.SemanticVersionRange)[1].minor).to.equal(Infinity);
      expect((range as version.SemanticVersionRange)[1].patch).to.equal(Infinity);
    });
  });
});