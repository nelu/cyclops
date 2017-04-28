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
import * as React from 'react';
import * as sinon from 'sinon';
import * as chai from 'chai';

// Local
import * as alertsAPI from '../../../api/alerts/api';
import * as alertDetailActions from './detail';

describe('Alert Detail actions', () => {
  let dispatch: sinon.SinonSpy;
  let getState: sinon.SinonSpy;

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = sinon.spy();
  });

  describe('performAlertDetailAction', () => {
    let performAction: sinon.SinonStub;
    let testAction: any;

    beforeEach(() => {
      performAction = sinon
        .stub(alertsAPI, 'performAction')
        .returns(Promise.resolve());
      testAction = (alertId: number, actionId: number) => {
        return alertDetailActions
          .performAlertDetailAction(
            alertId,
            actionId,
          )(
            dispatch,
            getState,
            undefined,
          );
      };
    });

    afterEach(() => {
      performAction.restore();
    });

    it('should pass alertId and actionId to performAction', () => {
      const alertId = 1;
      const actionId = 2;

      testAction(alertId, actionId);

      chai.expect(performAction.called).to.be.true;
      chai.expect(performAction.args[0][0]).to.equal(actionId);
      chai.expect(performAction.args[0][1]).to.equal(alertId);
    });
  });
});