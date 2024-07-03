export interface IGetServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  ClassModule?: any;
  params?: Record<string, any>;
  resourceIdentifier?: string;
}

export interface IGetSingleServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  id: string;
  ClassModule?: any;
}

export interface IPatchServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  payload: Record<string, any> | FormData;
  formData?: boolean;
  resourceIdentifier?: string;
}

export interface IPostServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  payload: Record<string, any> | FormData;
  formData?: boolean;
}

export interface IDeleteServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  resourceIdentifier: string;
  params?: Record<string, any>;
}

export interface IHardDeleteServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  id: string;
}

export interface IPaginatedServiceProps {
  authenticated: boolean;
  baseUrl: string;
  path: string;
  ClassModule?: any;
  params?: Record<string, any>;
}
