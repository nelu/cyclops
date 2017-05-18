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
import {
  AlertDataContextSearchReducer,
  INITIAL_STATE,
  REQUEST_ID,
} from './AlertDataContextSearchReducer';
import * as actions from '../actions/AlertDataContextSearchActions';
import * as requests from '~/services/cyphon/utils/requests';

describe('AlertDatatContextSearchReducer', () => {
  let cancel: sinon.SinonStub;
  let set: sinon.SinonStub;

  beforeEach(() => {
    cancel = sinon.stub(requests, 'cancel');
    set = sinon.stub(requests, 'set');
  });

  afterEach(() => {
    cancel.restore();
    set.restore();
  });

  describe('SELECT_CONTEXT', () => {
    it('should update the state with the given payload data', () => {
      const context = 1;
      const action = actions.selectContext(context);
      const state = AlertDataContextSearchReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        selectedContext: context,
      });
    });
  });

  describe('SEARCH_CONTEXT_PENDING', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.searchContextPending({} as any);
      const state = AlertDataContextSearchReducer({} as any, action);

      chai.expect(state).to.deep.equal({ loading: true });
    });

    it('should cancel any active request', () => {
      const action = actions.searchContextPending({} as any);

      AlertDataContextSearchReducer({} as any, action);

      chai.expect(cancel.called).to.be.true;
      chai.expect(cancel.args[0][0]).to.equal(REQUEST_ID);
    });

    it('should set the cancel function for a new request', () => {
      const canceler: any = {};
      const action = actions.searchContextPending(canceler);

      AlertDataContextSearchReducer({} as any, action);

      chai.expect(set.called).to.be.true;
      chai.expect(set.args[0][0]).to.equal(REQUEST_ID);
      chai.expect(set.args[0][1]).to.equal(canceler);
    });
  });

  describe('SEARCH_CONTEXT_SUCCESS', () => {
    it('should update the state with the given payload data', () => {
      const page = 1;
      const pageSize = 25;
      const resultCount = 100;
      const results: any[] = [];
      const action = actions.searchContextSuccess({
        page,
        pageSize,
        resultCount,
        results,
      });
      const state = AlertDataContextSearchReducer({} as any, action);

      chai.expect(state).to.deep.equal({
        loading: false,
        page,
        pageSize,
        resultCount,
        results,
      });
    });
  });
});