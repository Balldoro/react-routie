import * as React from 'react';

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

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
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
