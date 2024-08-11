import * as React from 'react';
import { mergePaths } from '../utils';

interface State {
  children: React.ReactNode;
  fullRoutePath: string;
  path: string;
}

export const RouteContext = React.createContext<State | undefined>(undefined);

interface RouteContextProviderProps {
  children: React.ReactNode;
}

export const RouteContextProvider = ({
  children,
}: RouteContextProviderProps) => {
  if (!React.isValidElement(children)) {
    throw new Error('Route is not a valid element!');
  }

  const { parentPath, path, children: nestedChildren } = children.props;
  const fullRoutePath = mergePaths(parentPath, path);

  const value = React.useMemo(
    () => ({ children: nestedChildren, fullRoutePath, path }),
    [fullRoutePath, nestedChildren, path],
  );

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};

export const useRoute = () => {
  const context = React.useContext(RouteContext);

  if (!context) {
    throw new Error('useRoute used outside of the Provider!');
  }

  return context;
};
