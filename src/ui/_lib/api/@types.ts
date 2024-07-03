import { MutationOptions, QueryKey, QueryObserverOptions, QueryOptions } from 'react-query';

export declare type QueryParamsType<T> =
  | QueryOptions<any, Error, any, QueryKey>
  | QueryObserverOptions<T | T[], Error, T | T[], T | T[], QueryKey>;

export declare type MutationParamsType = MutationOptions<any, Error, any, any>;

export interface IFetchDataProps<T> {
  queryParams?: QueryParamsType<T>;
  params?: Record<string, any>;
  paginated?: boolean;
}

export interface IFetchPaginatedDataProps {
  queryParams?: any;
  params?: Record<string, any>;
}

export interface IPostDataProps {
  mutationParams?: MutationParamsType;
  isFormData?: boolean;
  // payload: Record<string, any>;
}

export interface IPatchDataProps {
  mutationParams?: MutationParamsType;
  isFormData?: boolean;
  id?: string;
  // payload: Record<string, any>;
}
