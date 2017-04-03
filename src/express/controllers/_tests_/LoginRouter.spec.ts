// Vendor
import * as sinon from 'sinon';
import * as chai from 'chai';
import {  } from 'express';

// Local
import { LoginRouter, AuthenticationError } from '../LoginRouter';
import {
  ENV,
  CYPHON_LOGO_URL,
  MAIN_CSS_URL,
  CYPHON_API,
  DEFAULT_REDIRECT,
} from '../../constants';

describe('LoginRouter', () => {
  describe('#determineAuthenticationErrorType()', () => {
    it('should return a no connection error if there\'s no response', () => {
      const response: any = undefined;
      const error = LoginRouter.determineAuthenticationErrorType(response);

      chai.expect(error).to.equal(AuthenticationError.NoConnection);
    });

    it('should return a forbidden error if ther status if 403', () => {
      const response: any = { status: 403 };
      const error = LoginRouter.determineAuthenticationErrorType(response);

      chai.expect(error).to.equal(AuthenticationError.Forbidden);
    });

    it('should return a bad request if the status is 400', () => {
      const response: any = { status: 400 };
      const error = LoginRouter.determineAuthenticationErrorType(response);

      chai.expect(error).to.equal(AuthenticationError.BadRequest);
    });

    it('should return unknown if it doesn\'t match anything', () => {
      const response: any = { status: 5000 };
      const error = LoginRouter.determineAuthenticationErrorType(response);

      chai.expect(error).to.equal(AuthenticationError.Unknown);
    });
  });

  describe('#createNonFieldError()', () => {
    it('should return an object with a single non field error', () => {
      const message = 'HELP';
      const errors = LoginRouter.createNonFieldError(message);

      chai.expect(errors).to.deep.equal({
        non_field_errors: [message],
      });
    });
  });

  describe('#createErrorDisplayMessage()', () => {
    it('should return the response data if it is a bad request', () => {
      const data: any = {};
      const response: any = { status: 400, data };
      const message = LoginRouter.createErrorDisplayMessage(response);

      chai.expect(message).to.equal(data);
    });

    it('should return a message telling users to check their Cyphon config ' +
      'if it is a Forbidden error.', () => {
      const response: any = { status: 403 };
      const message = LoginRouter.createErrorDisplayMessage(response);

      chai.expect(message).to.deep.equal({
        non_field_errors: [
          `Authenication with ${ENV.CYPHON_URL} forbidden. Please check ` +
          `CORS_ORIGIN_WHITELIST in your Cyphon config and make sure the ` +
          `Cyclops URL is included.`,
        ],
      });
    });

    it('should return a message telling users that they lost connection to ' +
      'Cyphon when there is no response', () => {
      const response: any = undefined;
      const message = LoginRouter.createErrorDisplayMessage(response);

      chai.expect(message).to.deep.equal({
        non_field_errors: [
          `Cannot connect to Cyphon instance at ${ENV.CYPHON_URL}. ` +
          `Instance may be down.`,
        ],
      });
    });

    it('should return an unknown error message if the error is unknown', () => {
      const response: any = { status: 5000 };
      const message = LoginRouter.createErrorDisplayMessage(response);

      chai.expect(message).to.deep.equal({
        non_field_errors: [
          'Unknown error returned from the Cyphon API. Status 5000.',
        ],
      });
    });
  });

  describe('#displayLogin()', () => {
    let response: any;
    let request: any;
    let next: sinon.SinonSpy;
    let login: LoginRouter;

    beforeEach(() => {
      response = { render: sinon.spy() };
      request = {};
      next = sinon.spy();
      login = new LoginRouter();
    });

    it('should display the login page with correct template variables', () => {
      login.displayLogin(request, response, next);

      chai.expect(response.render.called).to.be.true;
      chai.expect(response.render.args[0]).to.deep.equal(
        [LoginRouter.LOGIN_TEMPLATE, { CYPHON_LOGO_URL, MAIN_CSS_URL }],
      );
    });
  });

  describe('#authenticate()', () => {
    let res: any;
    let req: any;
    let next: any;
    let body: any;
    let promise: any;
    let postStub: sinon.SinonStub;
    let login: LoginRouter;

    beforeEach(() => {
      body = {};
      res = {
        body,
        redirect: sinon.spy(),
        render: sinon.spy(),
      };
      req = { session: {}, query: {} };
      next = sinon.spy();
      login = new LoginRouter();
      promise = Promise.resolve();
      postStub = sinon.stub(CYPHON_API, 'post').returns(promise);
    });

    afterEach(() => {
      postStub.restore();
    });

    it('should make a call to /api-token-auth/ with the request body', () => {
      login.authenticate(req, res, next);

      chai.expect(postStub.called).to.be.true;
      chai.expect(postStub.args[0]).to.deep.equal(
        ['/api-token-auth/', req.body],
      );
    });

    describe('success', () => {
      let apiResponse: any;

      beforeEach(() => {
        apiResponse = { data: { token: 'token', user: {} } };
        promise = Promise.resolve(apiResponse);
        postStub.returns(promise);
      });

      it('should set the response token onto the request session', () => {
        return login.authenticate(req, res, next).then(() => {
          chai.expect(req.session.token).to.equal(apiResponse.data.token);
        });
      });

      it('should set the response user onto the request session', () => {
        return login.authenticate(req, res, next).then(() => {
          chai.expect(req.session.user).to.equal(apiResponse.data.user);
        });
      });

      it('should set authenticated to true', () => {
        return login.authenticate(req, res, next).then(() => {
          chai.expect(req.session.authenticated).to.be.true;
        });
      });

      it('should redirect to the default redirect if no next query parameter ' +
        'is given', () => {
        return login.authenticate(req, res, next).then(() => {
          chai.expect(res.redirect.called).to.be.true;
          chai.expect(res.redirect.args[0]).to.deep.equal([DEFAULT_REDIRECT]);
        });
      });
    });
  });
});