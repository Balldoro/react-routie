import * as React from 'react';
import {
  RouteContextProvider,
  useRouter,
  RouterContextProvider,
} from '../contexts';
import { renderMatchingRoute } from '../utils';

interface RouterProps {
  children: React.ReactNode;
}

interface RouteRendererProps extends RouterProps {}

const RouteRenderer = ({ children }: RouteRendererProps) => {
  const { currentPath } = useRouter();

  return (
    <RouteContextProvider>
      {renderMatchingRoute(children, currentPath)}
    </RouteContextProvider>
  );
};

export const Router = ({ children }: RouterProps) => {
  return (
    <RouterContextProvider>
      <RouteRenderer>{children}</RouteRenderer>
    </RouterContextProvider>
  );
};
