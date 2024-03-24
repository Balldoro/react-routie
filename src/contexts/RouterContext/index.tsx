import * as React from 'react';
import { POP_STATE_EVENT, ROUTE_CHANGE_EVENT } from 'constants';

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
  const [currentPath, setCurrentPath] = React.useState(location.pathname);

  React.useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(location.pathname);
    };

    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    window.addEventListener(POP_STATE_EVENT, handleRouteChange);

    return () => {
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
      window.removeEventListener(POP_STATE_EVENT, handleRouteChange);
    };
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
