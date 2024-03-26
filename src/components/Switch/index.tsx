import * as React from 'react';
import { renderMatchingRoute } from 'utils';
import { RouteContextProvider, useRouter } from 'contexts';

interface SwitchProps {
  children:
    | React.ReactElement<{ path: string; isMatch: boolean }>
    | Array<React.ReactElement<{ path: string; isMatch: boolean }>>;
}

export const Switch = ({ children }: SwitchProps) => {
  const { currentPath } = useRouter();

  return (
    <RouteContextProvider>
      {renderMatchingRoute(children, currentPath)}
    </RouteContextProvider>
  );
};
