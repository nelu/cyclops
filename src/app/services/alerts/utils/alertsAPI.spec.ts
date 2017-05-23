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
import * as api from '~/services/cyphon/api';
import * as alertAPI from './alertsAPI';

describe('alertsAPI', () => {
  let get: sinon.SinonStub;
  let post: sinon.SinonStub;

  beforeEach(() => {
    get = sinon.stub(api, 'get');
    post = sinon.stub(api, 'post');
  });

  afterEach(() => {
    get.restore();
    post.restore();
  });

  describe('fetchAlert', () => {
    it('should call get with the correct url', () => {
      const alertId = 1;

      alertAPI.fetchAlert(alertId);

      chai.expect(get.called).to.be.true;
      chai.expect(get.args[0][0]).to.equal('/alerts/1/');
    });

    it('should pass the cancel token to the get options', () => {
      const alertId = 1;
      const cancelToken: any = 'token';

      alertAPI.fetchAlert(alertId, cancelToken);

      chai.expect(get.called).to.be.true;
      chai.expect(get.args[0][1]).to.deep.equal({ cancelToken });
    });
  });

  describe('fetchAlertList', () => {
    it('should call get with the correct url', () => {
      alertAPI.fetchAlertList({} as any);

      chai.expect(get.called).to.be.true;
      chai.expect(get.args[0][0]).to.equal('/alerts/');
    });

    it('should pass the parameters to the get options', () => {
      const params: any = {};

      alertAPI.fetchAlertList(params);

      chai.expect(get.called).to.be.true;
      chai.expect(get.args[0][1]).to.deep.equal({
        params,
        cancelToken: undefined,
      });
    });

    it('should pass the cancel token to the get options', () => {
      const params: any = {};
      const cancelToken: any = {};

      alertAPI.fetchAlertList(params, cancelToken);

      chai.expect(get.called).to.be.true;
      chai.expect(get.args[0][1]).to.deep.equal({
        params,
        cancelToken,
      });
    });
  });

  describe('performAction()', () => {
    const actionId = 1;
    const alertId = 2;

    beforeEach(() => {
      post.resolves();
    });

    it('should post to the correct url', () => {
      alertAPI.performAction(actionId, alertId);

      chai.expect(post.called).to.be.true;
      chai.expect(post.args[0][0]).to.equal('/actions/1/run/');
    });

    it('should post the alertId as the post data', () => {
      alertAPI.performAction(actionId, alertId);

      chai.expect(post.called).to.be.true;
      chai.expect(post.args[0][1]).to.deep.equal({ alert: alertId });
    });
  });

  describe('fetchAllCategories()', () => {
    let getAll: sinon.SinonStub;

    beforeEach(() => {
      getAll = sinon.stub(api, 'getAll');
    });

    afterEach(() => {
      getAll.restore();
    });

    it('should call the correct url', () => {
      alertAPI.fetchAllCategories();

      chai.expect(getAll.called).to.be.true;
      chai.expect(getAll.args[0][0]).to.equal('/categories/');
    });
  });
});
