import * as React from 'react';
import { renderMatchingRoute } from 'utils';
import { useRouter, RouteContextProvider, useRoute } from 'contexts';

export const NestedRoute = () => {
  const { currentPath } = useRouter();
  const { children, fullRoutePath, path } = useRoute();

  const nestedRoute = renderMatchingRoute(children, currentPath, fullRoutePath);

  return nestedRoute ? (
    <RouteContextProvider>
      {React.cloneElement(nestedRoute, { parentPath: path })}
    </RouteContextProvider>
  ) : null;
};
