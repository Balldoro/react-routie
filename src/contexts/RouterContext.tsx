import * as React from 'react';
import { cutBasename, mergePaths, setupListeners } from '../utils';
import { RouteState } from 'types';

interface State {
  currentPath: string;
  currentPathWithQuery: string;
  search: string;
  basename: string;
  state: RouteState;
}

export const RouterContext = React.createContext<State | undefined>(undefined);

interface RouterContextProviderProps {
  basename: string;
  children: React.ReactNode;
}

const createState = (basename: string, routeState?: RouteState) => ({
  currentPath: `/${cutBasename(location.pathname, basename)}`,
  search: location.search,
  state: routeState,
});

export const RouterContextProvider = ({
  basename,
  children,
}: RouterContextProviderProps) => {
  const [state, setState] = React.useState(() => createState(basename));

  React.useLayoutEffect(() => {
    const handleRouteChange = (e: PopStateEvent) => {
      setState(createState(basename, e.state));
    };

    const unsubscribe = setupListeners(handleRouteChange);

    return unsubscribe;
  }, [basename]);

  const currentPathWithQuery = mergePaths(state.currentPath, state.search);
  const value = { ...state, basename, currentPathWithQuery };

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
