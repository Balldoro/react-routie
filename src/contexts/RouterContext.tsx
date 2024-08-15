import * as React from 'react';
import { getLocationSnapshot, mergePaths, subscribePopstate } from '../utils';
import { RouteState } from 'types';

interface State {
  currentPath: string;
  currentPathWithQuery: string;
  search: string;
  state: RouteState;
}

export const RouterContext = React.createContext<State | undefined>(undefined);

interface RouterContextProviderProps {
  children: React.ReactNode;
}

const useLocationSubscription = () =>
  React.useSyncExternalStore(subscribePopstate, getLocationSnapshot());

export const RouterContextProvider = ({
  children,
}: RouterContextProviderProps) => {
  const location = useLocationSubscription();
  const { currentPath, search } = location;

  const currentPathWithQuery = mergePaths(currentPath, search);

  const value = React.useMemo(
    () => ({ ...location, currentPathWithQuery }),
    [location, currentPathWithQuery],
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = React.useContext(RouterContext);

  if (!context) {
    throw new Error('useRouter used outside of the Provider!');
  }

  return context;
};
