/* eslint-disable no-nested-ternary */
import { Route, Routes } from 'react-router-dom';
import { ReactNode, Suspense } from 'react';
import { IRoute } from '@/routes';
import Fallback from '../Fallback';

interface IGenerateRouteParams {
  routes: IRoute[];
  fallback?: ReactNode;
}

/**
 *  This is a function called `generateRoutes` that takes an object with two properties: `routes` (an
 * array of objects that implement the `IRoute` interface) and `fallback` (an optional ReactNode). The
 * function returns a JSX element that wraps a `Routes` component from the `react-router-dom` library.
 */
export default function generateRoutes({ routes, fallback = <Fallback /> }: IGenerateRouteParams) {
  return (
    <Suspense fallback={fallback}>
      <Routes>
        {routes?.map((route) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={
                <Suspense fallback={route.fallback ? <route.fallback /> : fallback}>
                  <route.component />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}
