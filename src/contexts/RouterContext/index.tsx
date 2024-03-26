import * as React from 'react';
import { getClearPathname, setupListeners } from 'utils';

interface State {
  currentPath: string;
}

export const RouterContext = React.createContext<State | undefined>(undefined);

interface RouterContextProviderProps {
  children: React.ReactNode;
}

export const RouterContextProvider = ({
  children,
}: RouterContextProviderProps) => {
  const [currentPath, setCurrentPath] = React.useState(getClearPathname());

  React.useLayoutEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getClearPathname());
    };

    const unsubscribe = setupListeners(handleRouteChange);

    return unsubscribe;
  }, []);

  const value = { currentPath };

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
