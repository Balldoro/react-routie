import * as React from 'react';
import { useRouter } from 'contexts';
import { findRoute, flattenRoutes } from 'utils';

interface SwitchProps {
  children:
    | React.ReactElement<{ path: string; isMatch: boolean }>
    | Array<React.ReactElement<{ path: string; isMatch: boolean }>>;
}

export const Switch = ({ children }: SwitchProps) => {
  const { currentPath } = useRouter();

  const childrenArray = React.Children.toArray(children);
  const flatChildren = flattenRoutes(childrenArray);

  const routeToRender = flatChildren.find((c) =>
    findRoute(c.props.path, currentPath),
  );

  return routeToRender;
};
