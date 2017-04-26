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
import * as auth from './auth';

describe('authentication middleware', () => {
  let next: sinon.SinonSpy;
  let redirect: sinon.SinonSpy;
  let res: any;

  beforeEach(() => {
    next = sinon.spy();
    redirect = sinon.spy();
    res = { redirect };
  });

  describe('#isAuthenticated()', () => {
    it('should pass control of the request to the next middleware if the ' +
      'user is authenicated', () => {
      const req: any = { session: { token: 'blah', user: {} } };

      auth.isAuthenticated(req, res, next);

      chai.expect(next.called).to.be.true;
      chai.expect(redirect.called).to.be.false;
    });

    it('should redirect to the login url if the user is not authenticated', () => {
      const req: any = { originalUrl: '', session: { token: 'blah', user: {} } };

      auth.isAuthenticated(req, res, next);

      chai.expect(redirect.called).to.be.true;
      chai.expect(redirect.args[0][0])
        .to
        .equal('/login?next=%2Fapp');
    });

    it('should use the requested url as the next redirect if given', () => {
      const req: any = {
        originalUrl: '/alerts',
        session: { },
      };

      auth.isAuthenticated(req, res, next);

      chai.expect(redirect.called).to.be.true;
      chai.expect(redirect.args[0][0])
        .to
        .equal('/login?next=%2Falerts');
    });
  });

  describe('#isNotAuthenticated()', () => {
    it('should pass control of the request to the next middleware if the ' +
      'user is not authenticated', () => {
      const req: any = { session: { authenticated: false } };

      auth.isNotAuthenticated(req, res, next);

      chai.expect(next.called).to.be.true;
      chai.expect(redirect.called).to.be.false;
    });

    it('should redirect to the default redirect if the use is authenticated', () => {
      const req: any = { session: { authenticated: true } };

      auth.isNotAuthenticated(req, res, next);

      chai.expect(next.called).to.be.false;
      chai.expect(redirect.called).to.be.true;
      chai.expect(redirect.args[0][0]).to.equal('/app');
    });
  });
});
