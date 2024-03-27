import * as React from 'react';
import { mergePaths, setupListeners } from 'utils';

interface State {
  currentPath: string;
  currentPathWithQuery: string;
  search: string;
}

export const RouterContext = React.createContext<State | undefined>(undefined);

interface RouterContextProviderProps {
  children: React.ReactNode;
}

export const RouterContextProvider = ({
  children,
}: RouterContextProviderProps) => {
  const [currentPath, setCurrentPath] = React.useState(location.pathname);
  const [search, setSearch] = React.useState(location.search);

  React.useLayoutEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(location.pathname);
      setSearch(location.search);
    };

    const unsubscribe = setupListeners(handleRouteChange);

    return unsubscribe;
  }, []);

  const currentPathWithQuery = mergePaths(currentPath, search);
  const value = { currentPath, currentPathWithQuery, search };

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
