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
import { RequestHandler } from 'express';
import { parse } from 'url';
import * as _ from 'lodash';
import * as proxy from 'express-http-proxy';

// Local
import { ENV } from '../constants';

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Default headers for proxied requests.
 */
export const DEFAULT_PROXY_HEADERS: {[header: string]: string} = {
  'Content-Type': 'application/json',
  'accept': 'application/json, */*',
};

// --------------------------------------------------------------------------
// Methods
// --------------------------------------------------------------------------

/**
 * Decorates the proxy request before it's sent to the proxy url with
 * the DEFAULT_PROXY_HEADERS, adds the current API and deletes the 'cookie' header so there aren't
 * any conflicting CSRF concerns..
 * @param proxyReq Request object that will be proxied.
 * @param origReq Original Express request object.
 * @returns {Request}
 */
export const proxyDecorateRequest:
  proxy.DecorateRequest = (proxyReq, origReq) => {
  proxyReq.headers = _.assign({}, proxyReq.headers, DEFAULT_PROXY_HEADERS, {
    Authorization: `JWT ${origReq.session.token}`,
  });

  delete proxyReq.headers['cookie'];

  return proxyReq;
};

/**
 * Takes a requests url path and prefixes the CYPHON_API_PATH environment
 * variable.
 * @param req Express request object.
 * @returns {string}
 */
export const proxyForwardPath: proxy.ForwardPath = (req) => {
  return ENV.CYPHON_API_PATH + parse(req.url).path;
};

/**
 * Middleware that proxies requests to the CYPHON_URL environment variable.
 * @type {RequestHandler}
 */
export const cyphonApiProxy: RequestHandler = proxy(ENV.CYPHON_URL, {
  decorateRequest: proxyDecorateRequest,
  forwardPath: proxyForwardPath,
});
