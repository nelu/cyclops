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
import { createAssignedUpdateComment } from './createAssignedUpdateComment';
import { User } from '../../../services/users/types';

describe('createAssignedUpdateComment()', () => {
  const user1: User = {
    id: 1,
    company: 1,
    email: 'mail@gmail.com',
    first_name: 'Bob',
    last_name: 'Saget',
    is_staff: false,
  };
  const user2: User = {
    id: 2,
    company: 1,
    email: 'mail@gmail.com',
    first_name: 'George',
    last_name: 'Costanza',
    is_staff: true,
  };
  const user3: User = {
    id: 3,
    company: 1,
    email: 'mail@gmail.com',
    first_name: 'Robert',
    last_name: 'DeNiro',
    is_staff: true,
  };

  it('should return a comment stating the alert was assigned to the current ' +
    'user if the id matches the current user', () => {
    const comment = createAssignedUpdateComment(user1);

    chai.expect(comment).to.equal('Assigned to self.');
  });

  it('should return a comment stating the alert was assigned to the current ' +
    'user from another user if the id matches the current user and another ' +
    'user was given', () => {
    const comment = createAssignedUpdateComment(user1, user2);

    chai.expect(comment).to.equal('Assigned from George Costanza to self.');
  });

  it('should return a comment stating the alert was assigned to a specific ' +
    'user', () => {
    const comment = createAssignedUpdateComment(user2);

    chai.expect(comment).to.equal('Assigned to George Costanza.');
  });

  it('should return a comment stating the alert was assigned to a specific ' +
    'user from a specific user', () => {
    const comment = createAssignedUpdateComment(user2, user3);

    chai.expect(comment).to.equal(
      'Assigned from Robert DeNiro to George Costanza.',
    );
  });

  it('should say it was unassigned from someone when toUser is undefined', () => {
    const comment = createAssignedUpdateComment(undefined, user2);

    chai.expect(comment).to.equal('Unassigned from George Costanza.');
  });

  it('should say it was unassigned from nobody if all arguments are undefined', () => {
    const comment = createAssignedUpdateComment();

    chai.expect(comment).to.equal('Unassigned from nobody.');
  });
});