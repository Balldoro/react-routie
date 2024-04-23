import * as React from 'react';
import {
  RouteContextProvider,
  useRouter,
  RouterContextProvider,
} from '../contexts';
import { renderMatchingRoute } from '../utils';

interface RouterProps {
  basename?: string;
  children: React.ReactNode;
}

interface RouteRendererProps {
  children: React.ReactNode;
}

const RouteRenderer = ({ children }: RouteRendererProps) => {
  const { currentPath, basename } = useRouter();

  if (!location.pathname.startsWith(basename)) return null;

  return (
    <RouteContextProvider>
      {renderMatchingRoute(children, currentPath)}
    </RouteContextProvider>
  );
};

export const Router = ({ basename = '', children }: RouterProps) => {
  return (
    <RouterContextProvider basename={basename}>
      <RouteRenderer>{children}</RouteRenderer>
    </RouterContextProvider>
  );
};
