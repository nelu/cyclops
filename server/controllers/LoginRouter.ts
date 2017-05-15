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
import { AxiosResponse } from 'axios';

// Local
import {
  CYPHON_API,
  MAIN_CSS_URL,
  CYPHON_LOGO_URL,
} from '../constants';
import { isNotAuthenticated } from '../middlewares/auth';
import { DEFAULT_REDIRECT } from '../constants';
import { authenticateSession } from '../utils/auth';

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Name of the template to use for the login page.
 * @type {string}
 */
const LOGIN_TEMPLATE: string = 'login';

// --------------------------------------------------------------------------
// Interfaces
// --------------------------------------------------------------------------

/** Data sent with the authentication request. */
interface AuthenticateRequestBody {
  /** Email used to sign in with. */
  email: string;
  /** Password that pairs with the email. */
  password: string;
}

/** URL parameters of the authentication request. */
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

interface AuthentiateResponseData {
  /** API token for the authenticated user. */
  token: string;
  /** User information associated with the API token. */
  user: User;
}

/** Response back from the Cyphon API after an authenticate request. */
interface AuthenticateResponse extends AxiosResponse {
  data: AuthentiateResponseData;
}

/** Data from a failed authentication request. */
interface AuthenticateErrorData {
  /**
   * Errors associated with fields sent in the body of AuthenticateRequest.
   */
  [fieldError: string]: string[];
}

/** Response back from the Cyphon API after a failed authenticate request. */
interface AuthenticateError {
  response: AxiosResponse;
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
  errors?: AuthenticateErrorData;
}

// --------------------------------------------------------------------------
// Router
// --------------------------------------------------------------------------

/**
 * Router that deals with logging in users.
 */
export class LoginRouter {
  /**
   * Login template options that are the same between all routes.
   * @type {LoginTemplateOptions}
   */
  public static BASE_LOGIN_TEMPLATE_OPTIONS: LoginTemplateOptions = {
    CYPHON_LOGO_URL,
    MAIN_CSS_URL,
  };

  /**
   * Creates LoginTemplateOptions with error data.
   * @param errors
   * @returns {LoginTemplateOptions}
   */
  public static createErrorTemplateOptions(
    errors: AuthenticateErrorData,
  ): LoginTemplateOptions {
    return Object.assign(
      {},
      LoginRouter.BASE_LOGIN_TEMPLATE_OPTIONS,
      { errors },
    );
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
    res.render(LOGIN_TEMPLATE, LoginRouter.BASE_LOGIN_TEMPLATE_OPTIONS);
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
        const nextURL = req.query.next
          ? decodeURIComponent(req.query.next)
          : DEFAULT_REDIRECT;

        authenticateSession(req, response.data.token, response.data.user);
        res.redirect(nextURL);
      })
      .catch((error: AuthenticateError) => {
        res.render(
          LOGIN_TEMPLATE,
          LoginRouter.createErrorTemplateOptions(error.response.data),
        );
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
