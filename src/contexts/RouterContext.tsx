import * as React from 'react';
import {
  getPathname,
  getSearch,
  getState,
  mergePaths,
  subscribePopstate,
} from '../utils';
import { RouteState } from 'types';

interface State {
  currentPath: string;
  currentPathWithQuery: string;
  search: string;
  state: RouteState;
}

export const RouterContext = React.createContext<State | undefined>(undefined);

const usePopstateSubscribe = <T,>(callback: () => T) =>
  React.useSyncExternalStore(subscribePopstate, callback);

interface RouterContextProviderProps {
  children: React.ReactNode;
}

export const RouterContextProvider = ({
  children,
}: RouterContextProviderProps) => {
  const search = usePopstateSubscribe(getSearch);
  const currentPath = usePopstateSubscribe(getPathname);
  const state = usePopstateSubscribe(getState);

  const currentPathWithQuery = mergePaths(currentPath, search);

  const value = React.useMemo(
    () => ({ currentPath, search, state, currentPathWithQuery }),
    [currentPath, search, state, currentPathWithQuery],
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
