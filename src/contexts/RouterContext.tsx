import * as React from 'react';
import { mergePaths, setupListeners } from '../utils';
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

const createState = (routeState?: RouteState) => ({
  currentPath: location.pathname,
  search: location.search,
  state: routeState,
});

export const RouterContextProvider = ({
  children,
}: RouterContextProviderProps) => {
  const [state, setState] = React.useState(createState);

  React.useLayoutEffect(() => {
    const handleRouteChange = (e: PopStateEvent) => {
      setState(createState(e.state));
    };

    const unsubscribe = setupListeners(handleRouteChange);

    return unsubscribe;
  }, []);

  const currentPathWithQuery = mergePaths(state.currentPath, state.search);
  const value = { ...state, currentPathWithQuery };

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
