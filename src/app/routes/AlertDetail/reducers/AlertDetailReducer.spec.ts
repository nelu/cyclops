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
import * as reducer from './AlertDetailReducer';
import * as actions from '../actions/AlertDetailActions';
import { Canceler } from 'axios';
import * as d3 from 'd3';
import second = d3.time.second;

describe('Alert Detail Reducer', () => {
  describe('CLOSE_ALERT', () => {
    it('should return the initial state', () => {
      const state = reducer.AlertDetailReducer({} as any, actions.closeAlert());

      chai.expect(state).to.deep.equal(reducer.INITIAL_STATE);
    });

    it('should cancel an active request', () => {
      const state: any = {};
      const canceler = sinon.spy();

      reducer.AlertDetailReducer(state, actions.fetchAlertPending(1, canceler));
      reducer.AlertDetailReducer(state, actions.closeAlert());

      chai.expect(canceler.called).to.be.true;
    });
  });

  describe('FETCH_ALERT_PENDING', () => {
    let canceler: sinon.SinonSpy;

    beforeEach(() => {
      canceler = sinon.spy();
    });

    it('should update the state with the given payload', () => {
      const alertId = 1;
      const action = actions.fetchAlertPending(alertId, canceler);
      const state = reducer.AlertDetailReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        alertId: 1,
        loading: true,
      });
    });

    it('should cancel an active request', () => {
      const state: any = {};
      const secondCanceler = sinon.spy();

      reducer.AlertDetailReducer(state, actions.fetchAlertPending(1, canceler));
      reducer.AlertDetailReducer(state, actions.fetchAlertPending(2, secondCanceler));

      chai.expect(canceler.called).to.be.true;
    });
  });

  describe('ADD_ERROR_MESSAGE', () => {
    it('should add the error message to the state', () => {
      const message = ['message'];
      const action = actions.addErrorMessage(message);
      const state = reducer.AlertDetailReducer({} as any, action);

      chai.expect(state).to.deep.equal({ error: message });
    });
  });

  describe('CLOSE_ERROR_MESSAGE', () => {
    it('should set the error message to an empty string', () => {
      const state = reducer.AlertDetailReducer({} as any, actions.closeErrorMessage());

      chai.expect(state).to.deep.equal({ error: [] });
    });
  });
});