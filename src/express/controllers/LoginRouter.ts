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
import {
  Router,
  RequestHandler,
  Request,
  Response,
} from 'express';
import { AxiosResponse, AxiosError } from 'axios';

// Local
import {
  CYPHON_API,
  MAIN_CSS_URL,
  CYPHON_LOGO_URL,
  ENV,
} from '../constants';
import { isNotAuthenticated } from '../middlewares/auth';
import { DEFAULT_REDIRECT } from '../constants';
import { User } from '../types';

// --------------------------------------------------------------------------
// Interfaces
// --------------------------------------------------------------------------

/** JSON sent with an authentication request. */
interface AuthenticateRequestBody {
  /** Email to login with. */
  email: string;
  /** Password related to the email. */
  password: string;
}

/** URL query parameters sent with an authentication request. */
interface AuthenticateRequestQuery {
  /** URL the application should transfer to on a successful authentication. */
  next?: string;
}

/** Request made to the authenticate request handler. */
interface AuthenticateRequest extends Request {
  /** Body of the authentication request. */
  body: AuthenticateRequestBody;
  /** URL paramaters of the request. */
  query: AuthenticateRequestQuery;
}

interface AuthenticateResponseData {
  /** API token for the authenticated user. */
  token: string;
  /** User information associated with the API token. */
  user: User;
}

/** Response back from the Cyphon API after an authenticate request. */
interface AuthenticateResponse extends AxiosResponse {
  /** Data returned with the authentication response. */
  data: AuthenticateResponseData;
}

/** Data from a failed authentication request. */
interface AuthenticateErrorData {
  /**
   * Errors not associated with any of the fields sent in the body of
   * AuthenticateRequest.
   */
  non_field_errors?: string[];
  /** Errors associated with fields sent in the body of AuthenticateRequest. */
  [fieldError: string]: string[];
}

/** Response object associated with an authentication error. */
interface AuthenticateErrorResponse extends AxiosResponse {
  /** Data sent with the authentication error response. */
  data: AuthenticateErrorData;
}

/** Response back from the Cyphon API after a failed authenticate request. */
interface AuthenticateError extends AxiosError {
  response?: AuthenticateErrorResponse;
}

/**
 * Options for the login template.
 */
interface LoginTemplateOptions {
  /** URL of the Cyphon Logo when accessed from a browser. */
  CYPHON_LOGO_URL: string;
  /** URL of the main css file when accessed from a browser. */
  MAIN_CSS_URL: string;
  /** Any errors made when authenticating. */
  ERRORS?: AuthenticateErrorData;
}

/** Possible error types returned from an authentication request. */
export enum AuthenticationError {
  /** When there is no connection to the Cyphon instance. */
  NoConnection,
  /**
   * When the request is returned with a 403 error. Typically means that
   * there is a CORS issue.
   */
  Forbidden,
  /** When the request contains a user error. */
  BadRequest,
  /** When the request doesn't match any know error types. */
  Unknown,
}

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Router that deals with logging in users.
 */
export class LoginRouter {
  public static LOGIN_TEMPLATE = 'login';
  /**
   * Determines what kind of error is returned from a failed
   * authentication request.
   * @param response Response from the server.
   * @returns {AuthenticationError} The type of error.
   */
  public static determineAuthenticationErrorType(
    response?: AuthenticateErrorResponse,
  ): AuthenticationError {
    if (!response) { return AuthenticationError.NoConnection; }
    if (response.status === 403) { return AuthenticationError.Forbidden; }
    if (response.status === 400) { return AuthenticationError.BadRequest; }

    return AuthenticationError.Unknown;
  }

  /**
   * Creates an authentication error that contains a single non field error.
   * @param message Error message to include.
   * @returns {{non_field_errors: [string]}}
   */
  public static createNonFieldError(message: string): AuthenticateErrorData {
    return { non_field_errors: [message] };
  }

  /**
   * Creates an object with error messages that can be displayed in the
   * login template.
   * @param response Response that returned with the error.
   */
  public static createErrorDisplayMessage(
    response?: AuthenticateErrorResponse,
  ): AuthenticateErrorData {
    const errorType = LoginRouter.determineAuthenticationErrorType(response);

    switch (errorType) {
      // Return the response data if it's a bad request. It should have the
      // error messages in it already.
      case AuthenticationError.BadRequest:
        return response.data;
      case AuthenticationError.Forbidden:
        return LoginRouter.createNonFieldError(
          `Authenication with ${ENV.CYPHON_URL} forbidden. Please check ` +
          `CORS_ORIGIN_WHITELIST in your Cyphon config and make sure the ` +
          `Cyclops URL is included.`,
        );
      case AuthenticationError.NoConnection:
        return LoginRouter.createNonFieldError(
          `Cannot connect to Cyphon instance at ${ENV.CYPHON_URL}. ` +
          `Instance may be down.`,
        );
      case AuthenticationError.Unknown:
      default:
        return LoginRouter.createNonFieldError(
          `Unknown error returned from the Cyphon API. Status ` +
          `${response.status}.`,
        );
    }
  }

  /**
   * Express router object for this router.
   */
  public router: Router;

  /**
   * Sets up the router object, middleware
   */
  constructor() {
    this.router = Router();
    this.middleware();
    this.routes();
  }

  /**
   * Displays the login template without any errors.
   * @param req Express request object.
   * @param res Express response object.
   */
  public displayLogin: RequestHandler = (req, res) => {
    const options: LoginTemplateOptions = {
      CYPHON_LOGO_URL,
      MAIN_CSS_URL,
    };

    res.render(LoginRouter.LOGIN_TEMPLATE, options);
  };

  /**
   * RequestHandler that attempts to authenticate with the Cyphon instance.
   * If it does, then it redirects to either the url in the 'next' url query
   * parameter or the default redirect url.
   * @param req Express request object.
   * @param res Express response object.
   * @returns {IPromise<void>}
   */
  public authenticate: RequestHandler = (
    req: AuthenticateRequest,
    res: Response,
  ) => {
    return CYPHON_API.post('/api-token-auth/', req.body)
      .then((response: AuthenticateResponse) => {
        const decodedURI = req.query.next
          ? decodeURIComponent(req.query.next)
          : undefined;
        const redirectURL = decodedURI || DEFAULT_REDIRECT;

        // Set session information.
        req.session.token = response.data.token;
        req.session.user = response.data.user;
        req.session.authenticated = true;

        res.redirect(redirectURL);
      })
      .catch((error: AuthenticateError) => {
        const errors = LoginRouter.createErrorDisplayMessage(error.response);
        const options: LoginTemplateOptions = {
          CYPHON_LOGO_URL,
          MAIN_CSS_URL,
          ERRORS: errors,
        };

        res.render(LoginRouter.LOGIN_TEMPLATE, options);
      });
  };

  /**
   * Configure middleware for this router.
   */
  private middleware(): void {
    this.router.use('/', isNotAuthenticated);
  }

  /**
   * Configure routes for this router.
   */
  private routes(): void {
    this.router.get('/', this.displayLogin);
    this.router.post('/', this.authenticate);
  }
}
