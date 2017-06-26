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
import * as chai from 'chai';

// Local
import * as utils from './normalizrUtils';

describe('normalizrUtils', () => {
  const user1 = { id: 1, name: 'George' };
  const user2 = { id: 2, name: 'Bob' };
  const user3 = { id: 3, name: 'Stacy' };
  const normalized1 = {
    result: [1, 2],
    entities: {
      users: {
        1: user1,
        2: user2,
      },
    },
  };

  describe('updateNormalizedData()', () => {
    const userUpdate1 = { id: 1, name: 'Coffee' };
    const userUpdate2 = { id: 2, name: 'Eagle' };
    const normalized2 = {
      result: [1, 2, 3],
      entities: {
        users: {
          1: userUpdate1,
          2: userUpdate2,
          3: user3,
        },
      },
    };
    const correctUpdate = {
      result: [1, 2, 3],
      entities: {
        users: {
          1: userUpdate1,
          2: userUpdate2,
          3: user3,
        },
      },
    };

    it('should update a normalized list with another normalized list', () => {
      const update = utils.updateNormalizedList(normalized1, normalized2);

      chai.expect(update).to.deep.equal(correctUpdate);
    });
  });

  describe('getEntitiesByID()', () => {
    it('should return an empty array if there are no entities with the ' +
      'given name', () => {
      const result = utils.getEntitiesByID(normalized1.entities, 'meh', [1, 2]);

      expect(result).to.deep.equal([]);
    });

    it('should return the entities that match', () => {
      const result = utils.getEntitiesByID(
        normalized1.entities,
        'users',
        [user1.id, user2.id],
      );

      expect(result).to.deep.equal([user1, user2]);
    });
  });
});
