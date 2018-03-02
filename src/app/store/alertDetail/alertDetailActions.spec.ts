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
import axios from 'axios';

// Local
import * as alertsAPI from '~/services/alerts/utils/alertsAPI';
import * as actions from './alertDetailActions';
import * as errorActions from '../errorModal/errorModalActions';
import * as checkAlertUpdate from '~/services/alerts/utils/checkAlertUpdate';
import * as modifyAlertUpdate from '~/services/alerts/utils/modifyAlertUpdate';
import * as apiUtils from '~/services/cyphon/utils/cancelTokens';
import {
  AlertDetail,
  AlertUpdateRequest,
} from '~/services/alerts/types';

describe('AlertDetailActions', () => {
  let addError: sinon.SinonStub;
  let isCancel: sinon.SinonStub;
  let dispatch: sinon.SinonSpy;
  let getState: sinon.SinonSpy;

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = sinon.spy();
    isCancel = sinon.stub(axios, 'isCancel');
    addError = sinon.stub(errorActions, 'addError');
  });

  afterEach(() => {
    isCancel.restore();
    addError.restore();
  });

  describe('addErrorMessage()', () => {
    it('should return an ADD_ERROR_MESSAGE action', () => {
      const message = ['message'];

      expect(actions.addErrorMessage(message)).toEqual({
        type: actions.ADD_ERROR_MESSAGE,
        payload: message,
      });
    });
  });

  describe('closeErrorMessage()', () => {
    it('should return a CLOSE_ERROR_MESSAGE action', () => {
      expect(actions.closeErrorMessage()).toEqual({
        type: actions.CLOSE_ERROR_MESSAGE,
        payload: undefined,
      });
    });
  });

  describe('performAlertDetailAction()', () => {
    let performAction: sinon.SinonStub;
    let testAction: any;

    beforeEach(() => {
      performAction = sinon
        .stub(alertsAPI, 'performAction')
        .returns(Promise.resolve());
      testAction = (alertId: number, actionId: number) => {
        return actions
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

      expect(performAction.called).toBe(true);
      expect(performAction.args[0][0]).toEqual(actionId);
      expect(performAction.args[0][1]).toEqual(alertId);
    });
  });

  describe('updateAlertDetail()', () => {
    let checkAlertUpdateStub: sinon.SinonStub;
    let modifyAlertUpdateStub: sinon.SinonStub;
    let getCancelTokenSource: sinon.SinonStub;
    let updateAlert: sinon.SinonStub;
    let check: checkAlertUpdate.AlertUpdateCheck;
    let update: any;
    let cancel: any;
    let token: any;
    let promise: Promise<any>;
    let testAction: any;
    let alertPromise: any;
    let alertParam: any;
    let fieldParam: any;

    beforeEach(() => {
      cancel = {};
      token = {};
      check = {
        valid: true,
        errors: [],
      };
      alertParam = {
        id: 1,
      };
      fieldParam = {};
      update = {
        updated: 'updated',
      };
      alertPromise = {};
      promise = Promise.resolve(alert);

      checkAlertUpdateStub = sinon
        .stub(checkAlertUpdate, 'checkAlertUpdate')
        .returns(check);

      modifyAlertUpdateStub = sinon
        .stub(modifyAlertUpdate, 'modifyAlertUpdate')
        .returns(update);

      getCancelTokenSource = sinon
        .stub(apiUtils, 'getCancelTokenSource')
        .returns({ cancel, token });

      updateAlert = sinon
        .stub(alertsAPI, 'updateAlert')
        .returns(promise);

      testAction = (alert: AlertDetail, fields: AlertUpdateRequest) => {
        return actions.updateAlertDetail(alert, fields)(dispatch, getState, undefined);
      };
    });

    afterEach(() => {
      checkAlertUpdateStub.restore();
      modifyAlertUpdateStub.restore();
      getCancelTokenSource.restore();
      updateAlert.restore();
    });

    it('should check the alert update', () => {
      return testAction(alertParam, fieldParam).then(() => {
        expect(checkAlertUpdateStub.called).toBe(true);
        expect(checkAlertUpdateStub.args[0]).toEqual(
          [alertParam, fieldParam],
        );
      });
    });

    it('should modify the alert update', () => {
      return testAction(alertParam, fieldParam).then(() => {
        expect(modifyAlertUpdateStub.called).toBe(true);
        expect(modifyAlertUpdateStub.args[0]).toEqual(
          [alertParam, fieldParam],
        );
      });
    });

    it('should add an error message if the update is not valid', () => {
      const errors = ['meh'];

      check.errors = errors;
      check.valid = false;

      return testAction(alertParam, fieldParam).catch((error: string) => {
        expect(error).toEqual(Error('Alert update request failed'));
        expect(dispatch.called).toBe(true);
        expect(dispatch.args[0][0]).toEqual({
          type: actions.ADD_ERROR_MESSAGE,
          payload: errors,
          error: undefined,
        });
      });
    });

    it('should send a request pending action', () => {
      return testAction(alertParam, fieldParam).then(() => {
        expect(dispatch.called).toBe(true);
        expect(dispatch.args[0]).toEqual([{
          type: actions.REQUEST_PENDING,
          payload: cancel,
          error: undefined,
        }]);
      });
    });

    it('should call updateAlert', () => {
      return testAction(alertParam, fieldParam).then(() => {
        expect(updateAlert.called).toBe(true);
        expect(updateAlert.args[0]).toEqual([
          alertParam.id,
          update,
          token,
        ]);
      });
    });
  });
});
