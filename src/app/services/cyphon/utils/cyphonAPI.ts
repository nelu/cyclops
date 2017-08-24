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
import axios, { AxiosInstance } from 'axios';
import * as _ from 'lodash';
import * as Cookies from 'js-cookie';

// Local
import { getConfig } from '~/config';
import { APIConfig, APIList } from '../types';
import { paramsSerializer } from './URLParams';
import * as cache from './APICache';

/**
 * Instance of axios that connects to the Express Cyphon API Proxy.
 * @type {AxiosInstance}
 */
const cyphonAPI: AxiosInstance = axios.create({
  baseURL: getConfig().API_URL,
  paramsSerializer,
  timeout: getConfig().API_TIMEOUT,
  headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
});

/**
 * Makes a request to the CyphonAPI using an APIConfig object, creates a
 * function that can cancel the request, sets that function onto the
 * requests index, and caches the return promise if the cache flag is
 * set to true in the APIConfig object.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function request<T>(config: APIConfig): Promise<T> {
  const cacheRequest = (config.cache && config.method === 'get');

  // Return the cached request if there is one and if cache is true.
  if (cacheRequest) {
    const cachedPromise = cache.get<T>(config);
    if (cachedPromise) { return cachedPromise; }
  }

  const promise: Promise<T> = cyphonAPI.request(config)
    // Extract that stores from the successful response.
    .then<T>((response) => response.data);

  if (cacheRequest) {
    // If cache is set to true and the promise fails, remove the promise
    // from the cache.
    const updatedPromise = promise.catch((error) => {
      cache.remove(config);
      return error;
    });

    // Save the promise to the cache.
    cache.set(config, updatedPromise);

    return updatedPromise;
  }

  return promise;
}

/**
 * Make a GET request to the Cyphon API.
 * @param url Request url.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function get<T>(url: string, config?: APIConfig): Promise<T> {
  return request<T>(_.assign({}, config, { url, method: 'get' }));
}

/**
 * Recursively gets all the results from an get response that returns an
 * APIList response by paginating.
 * @param baseUrl Base url of the get request.
 * @param params Stringified parameters to add to the base url.
 * @param results Previous results to add new results onto.
 * @returns {Promise<T[]>} Combined results.
 */
export function getAll<T>(
  baseUrl: string,
  params?: string,
  results?: T[],
): Promise<T[]> {
  const url = params ? `${baseUrl}?${params}` : baseUrl;
  const baseResults = results ? results : [];

  return get<APIList<T>>(url).then((response) => {
    const combinedResults = baseResults.concat(response.results);

    if (!response.next) { return Promise.resolve(combinedResults); }

    const nextParams = response.next.substring(response.next.indexOf('?' + 1));

    return getAll(baseUrl, nextParams, combinedResults);
  });
}

/**
 * Makes a POST request to the CyphonAPI.
 * @param url Request url.
 * @param data Data to send with the POST.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function post<T>(
  url: string,
  data?: any,
  config?: APIConfig,
): Promise<T> {
  return request<T>(_.assign({}, config, { url, data, method: 'post' }));
}

/**
 * Makes a PUT request to the CyphonAPI.
 * @param url Request url.
 * @param data Data to send with the PUT.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function put<T>(
  url: string,
  data?: any,
  config?: APIConfig,
): Promise<T> {
  return request<T>(_.assign({}, config, { url, data, method: 'put' }));
}

/**
 * Makes a PATCH request to the CyphonAPI.
 * @param url Request url.
 * @param data Data to send with the PATCH.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function patch<T>(
  url: string,
  data?: any,
  config?: APIConfig,
): Promise<T> {
  return request<T>(_.assign({}, config, { url, data, method: 'patch' }));
}
