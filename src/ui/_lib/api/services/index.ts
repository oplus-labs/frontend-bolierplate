/* eslint-disable no-nested-ternary */

import { api, authenticatedApi, authenticatedFormDataApi, formDataApi } from '../config';
import { IDeleteServiceProps, IGetServiceProps, IPatchServiceProps, IPostServiceProps } from './@types';

/**
 * The function `getService` is an asynchronous function that makes a GET request to a specified API
 * endpoint and returns the response data, optionally converting it into instances of a specified class
 * module.
 * @param {IGetServiceProps}  - - `authenticated`: a boolean indicating whether the API request should
 * be authenticated or not.
 * @returns either an array of instances of the provresourceIdentifiered ClassModule, or the response data itself if
 * ClassModule is not provresourceIdentifiered.
 */
export const getService = async ({
  authenticated,
  baseUrl,
  path,
  ClassModule,
  params,
  resourceIdentifier,
}: IGetServiceProps) => {
  try {
    const response = authenticated
      ? await authenticatedApi.get(`${baseUrl}${path}${resourceIdentifier || ''}`, { params })
      : await api.get(`${baseUrl}${path}${resourceIdentifier || ''}`, { params });
    const instances = ClassModule
      ? Array.isArray(response.data)
        ? response.data.map((item: any) => {
            return new ClassModule(item);
          })
        : new ClassModule(response.data)
      : null;
    return instances || response.data;
  } catch (err: any) {
    throw new Error(err.response.data.detail || err.response.data.Message || err.response.data.message);
  }
};

/**
 * The `patchService` function sends a PATCH request to a specified URL with optional authentication
 * and payload, and returns the response data.
 * @param {IPatchServiceProps}  - - `authenticated`: a boolean indicating whether the request should be
 * authenticated or not.
 * @returns the `data` property of the `response` object.
 */
export const patchService = async ({
  authenticated,
  baseUrl,
  path,
  payload,
  resourceIdentifier,
  formData,
}: IPatchServiceProps) => {
  try {
    const response = authenticated
      ? formData
        ? await authenticatedFormDataApi.patch(`${baseUrl}${path}${resourceIdentifier || ''}`, payload)
        : await authenticatedApi.patch(`${baseUrl}${path}${resourceIdentifier || ''}`, payload)
      : await api.patch(`${baseUrl}${path}${resourceIdentifier || ''}`, payload);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.detail || err.response.data.Message || err.response.data.message);
  }
};

/**
 * The `postService` function is an asynchronous function that sends a POST request to a specified URL
 * with optional authentication and form data, and returns the response data.
 * @param {IPostServiceProps}  - - `authenticated`: a boolean value indicating whether the request
 * should be authenticated or not.
 * @returns the `data` property of the `response` object.
 */
export const postService = async ({ authenticated, baseUrl, path, payload, formData }: IPostServiceProps) => {
  try {
    const response = authenticated
      ? formData
        ? await authenticatedFormDataApi.post(`${baseUrl}${path}`, payload)
        : await authenticatedApi.post(`${baseUrl}${path}`, payload)
      : formData
      ? await formDataApi.post(`${baseUrl}${path}`, payload)
      : await api.post(`${baseUrl}${path}`, payload);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

/**
 * The `deleteService` function is an asynchronous function that sends a PATCH request to delete a
 * resource identified by `resourceIdentifier` at the specified `baseUrl` and `path`, with optional
 * `params`, and returns the response data.
 * @param {IDeleteServiceProps}  - - `authenticated`: a boolean value indicating whether the request
 * should be made with an authenticated API or not.
 * @returns the `response.data` from the API call.
 */
export const deleteService = async ({
  authenticated,
  baseUrl,
  path,
  resourceIdentifier,
  params,
}: IDeleteServiceProps) => {
  try {
    const response = authenticated
      ? await authenticatedApi.patch(`${baseUrl}${path}/${resourceIdentifier}/`, { params })
      : await api.patch(`${baseUrl}${path}/${resourceIdentifier}/`, { params });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.detail || err.response.data.Message || err.response.data.message);
  }
};
