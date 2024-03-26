import * as React from 'react';
import { renderMatchingRoute } from 'utils';
import { useRouter, RouteContextProvider, useRoute } from 'contexts';

export const NestedRoute = () => {
  const { currentPath } = useRouter();
  const { children, fullPath, path } = useRoute();

  const nestedRoute = renderMatchingRoute(children, currentPath, fullPath);

  return nestedRoute ? (
    <RouteContextProvider>
      {React.cloneElement(nestedRoute, { parentPath: path })}
    </RouteContextProvider>
  ) : null;
};
