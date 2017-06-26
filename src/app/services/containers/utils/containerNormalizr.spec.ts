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

// Local
import * as test from './containerNormalizr';
import { CONTAINER_ENTITY_KEY } from '~/services/containers/constants';

describe('containerNormalizr', () => {
  describe('getContainerEntities()', () => {
    it('returns the container entities from a dictionary of entities', () => {
      const value1 = 'meh';
      const value2 = 'blah';
      const result = test.getContainerEntities({
        [CONTAINER_ENTITY_KEY]: {
          1: value1,
          2: value2,
        },
      });

      expect(result).to.deep.equal([value1, value2]);
    });

    it('should return an empty array if there are no container entities', () => {
      expect(test.getContainerEntities({})).to.deep.equal([]);
    });
  });
});
