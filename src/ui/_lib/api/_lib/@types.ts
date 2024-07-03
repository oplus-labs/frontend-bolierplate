export interface IFetchDataResults<T> {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  data: T | T[] | undefined;
}
export interface IFetchSingleDataResults<T> {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  data: T | T[] | undefined;
}

export interface IFetchPaginatedDataResults {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasPreviousPage: boolean | undefined;
  hasNextPage: boolean | undefined;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  data: any | undefined;
}

export interface IPostDataResults<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  mutate: any;
  data: T | T[] | undefined;
}
export interface IHardDeleteDataResults<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  mutate: any;
  data: T | T[] | undefined;
}
export interface ISoftDeleteDataResults<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  mutate: any;
  data: T | T[] | undefined;
}
export interface IPatchDataResults<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  mutate: any;
  data: T | T[] | undefined;
}
