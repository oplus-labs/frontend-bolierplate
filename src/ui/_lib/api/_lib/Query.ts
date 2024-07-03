import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { IFetchDataProps, IPostDataProps, MutationParamsType, IPatchDataProps } from '../@types';
import { deleteService, getService, patchService, postService } from '@/api/services';
import {
  IFetchDataResults,
  IFetchPaginatedDataResults,
  IPatchDataResults,
  IPostDataResults,
  ISoftDeleteDataResults,
} from './@types';

/**
 *  `Query` is a TypeScript class that provides methods for fetching and mutating data using the
 * `react-query` library. It takes in parameters such as the URL of the API endpoint, a key to
 * store the data, and a baseUrl to use for authentication. The class provides methods for fetching
 * data, fetching a single data item, fetching paginated data, and performing mutations such as
 * patching and deleting data. The class uses the `useQuery` and `useMutation` hooks from
 * `react-query` to handle data fetching and mutations.
 * */

class Query<T> {
  url: string;

  key = 'mutation_key';

  baseUrl: string;

  authenticated: boolean;

  ClassModule?: T;

  constructor(authenticated: boolean, url: string, key: string, baseUrl: string, ClassModule?: T) {
    this.url = url;
    this.key = key;
    this.baseUrl = baseUrl;
    this.authenticated = authenticated;
    this.ClassModule = ClassModule;
  }

  /**
   * This function fetches data using a query key and parameters, and returns a result using the
   * useQuery hook in TypeScript.
   * @param props - The props parameter is an optional object that contains properties for configuring
   * the fetchData function. It has a generic type of IFetchDataProps<T>, which means that it can
   * accept any type T. The default value for props is an empty object that contains an empty params
   * property.
   * @returns The function `fetchData` is returning a `UseQueryResult` object which contains the result
   * of a query made using the `useQuery` hook. The result can be of type `T` or `T[]` (an array of
   * `T`), and the query is made using the `queryKey` and `queryFn` options. The `queryParams` object
   * is also included as
   */
  public get(
    props: IFetchDataProps<T> = { params: {}, paginated: false },
  ): IFetchDataResults<T> | IFetchPaginatedDataResults {
    if (props.paginated) {
      const { isLoading, hasNextPage, isFetchingNextPage, hasPreviousPage, isError, error, isSuccess, data } =
        useInfiniteQuery<any | T[], Error, any, any>({
          queryKey: [this.baseUrl, `paginated-${this.key}`],
          queryFn: ({ pageParam = 1 }) =>
            getService({
              authenticated: this.authenticated,
              baseUrl: this.baseUrl,
              path: this.url,
              ClassModule: this.ClassModule,
              params: {
                ...props.params,
                page: pageParam,
              },
            }),
          getNextPageParam: (lastPage: any) => lastPage.nextPage,
          ...props.queryParams,
        });

      return { isLoading, hasNextPage, isFetchingNextPage, hasPreviousPage, isError, error, isSuccess, data };
    }

    const { isLoading, isError, isSuccess, error, isFetching, data } = useQuery<T | T[], Error>({
      queryKey: [this.baseUrl, this.key],
      queryFn: () =>
        this.ClassModule
          ? getService({
              authenticated: this.authenticated,
              baseUrl: this.baseUrl,
              path: this.url,
              ClassModule: this.ClassModule,
              params: props.params,
            })
          : getService({
              authenticated: this.authenticated,
              baseUrl: this.baseUrl,
              path: this.url,
              params: props.params,
            }),
      ...props.queryParams,
    });

    return { isLoading, isError, error, isFetching, isSuccess, data };
  }

  /**
   * This function posts data using a mutation and handles notifications and query invalidation.
   * @param {MutationParamsType} mutationParams - An object containing additional parameters for the
   * useMutation hook, such as onError or onSettled.
   * @param payload - The payload parameter is a record (an object) that contains data to be sent in the
   * request body when making a POST request. It can contain any number of key-value pairs, where the
   * keys represent the names of the fields being sent and the values represent the values of those
   * fields.
   * @returns The function `postData` returns a `UseMutationResult` object, which is the result of
   * calling the `useMutation` hook with the provided parameters.
   */
  public post(props: IPostDataProps = { mutationParams: {}, isFormData: false }): IPostDataResults<T> {
    // public postData(): UseMutationResult<T, Error, void, unknown> {
    const { isLoading, isError, isSuccess, mutate, error, data } = useMutation<T, Error, any, unknown>({
      mutationKey: [this.baseUrl, `post-${this.key}`],
      mutationFn: (receivedMutationData?: any) =>
        postService({
          authenticated: this.authenticated,
          baseUrl: this.baseUrl,
          path: this.url,
          payload: receivedMutationData,
          formData: props.isFormData,
        }),
      ...(props.mutationParams || {}),
    });

    return { isLoading, isError, isSuccess, mutate, error, data };
  }

  /**
   * This function returns a mutation result for patching data, which invalidates queries upon success.
   * @param {MutationParamsType} mutationParams - an object containing optional parameters for the
   * useMutation hook, such as onSettled, onError, and retry. These parameters customize the behavior of
   * the mutation and can be used to handle errors and update the UI after the mutation is completed.
   * @param params - A record of key-value pairs representing the data to be patched.
   * @returns The function `patchData` returns a `UseMutationResult` object, which is the result of
   * calling the `useMutation` hook with the provided parameters and additional options.
   */
  public patch(
    props: IPatchDataProps = {
      mutationParams: {},
      isFormData: false,
      id: '',
    },
  ): IPatchDataResults<T> {
    const { isLoading, isError, isSuccess, mutate, error, data } = useMutation<T, Error, any, unknown>({
      mutationKey: [this.baseUrl, `post-${this.key}`],
      onMutate: () => {
        //* display postinfo data notification
      },
      // mutationFn: () => postService(this.authenticated, this.baseUrl, this.url, props.payload),
      mutationFn: ({ id: receivedId, ...rest }: Record<string, any>) =>
        patchService({
          authenticated: this.authenticated,
          baseUrl: this.baseUrl,
          path: this.url,
          payload: { id: receivedId, ...rest },
          resourceIdentifier: receivedId || props.id,
          formData: props.isFormData,
        }),
      ...(props.mutationParams || {}),
    });
    return { isLoading, isError, isSuccess, mutate, error, data };
  }

  /**
   * This function performs a soft delete operation on data and returns a mutation result using the
   * useMutation hook in TypeScript.
   * @param {MutationParamsType} mutationParams - An object containing optional parameters for the
   * useMutation hook, such as onSettled, onError, and onMutate.
   * @param {string} id - The ID of the data that needs to be soft-deleted.
   * @returns The function `softDeleteData` returns a `UseMutationResult` object, which is the result of
   * calling the `useMutation` hook with some specific parameters.
   */
  public delete(mutationParams: MutationParamsType, resourceIdentifier: string): ISoftDeleteDataResults<T> {
    const { isLoading, isError, isSuccess, mutate, error, data } = useMutation<T, Error, void, unknown>({
      mutationKey: [this.baseUrl, `delete-${this.key}-s`],
      mutationFn: () =>
        deleteService({ authenticated: this.authenticated, baseUrl: this.baseUrl, path: this.url, resourceIdentifier }),
      ...mutationParams,
    });
    return { isLoading, isError, isSuccess, mutate, error, data };
  }
}
export default Query;
