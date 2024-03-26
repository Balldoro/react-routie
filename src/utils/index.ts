import * as React from 'react';
import { parse } from 'regexparam';
import { ROUTE_CHANGE_EVENT } from 'constants';

const flattenRoutes = (children: React.ReactNode[], parentPath = '') => {
  const allChildren: React.ReactElement[] = [];

  for (let i = 0, length = children.length; i < length; i++) {
    const item = children[i];
    if (React.isValidElement(item)) {
      const { path, children } = item.props;

      allChildren.push(
        React.cloneElement(item, {
          //@ts-expect-error Fix Item type definition
          path: `${parentPath}${path}`,
          parentPath,
        }),
      );

      if (children) {
        const childrenArray = [].concat(children);
        allChildren.push(...flattenRoutes(childrenArray, path));
      }
    }
  }
  return allChildren;
};

export const renderMatchingRoute = (
  children: React.ReactNode,
  currentPath: string,
  parentPath = '',
) => {
  const childrenArray = React.Children.toArray(children);
  const flatChildren = flattenRoutes(childrenArray);

  const routeToRender = flatChildren.find((c) =>
    findRoute(`${parentPath}${c.props.path}`, currentPath),
  );

  const routeParentPath = routeToRender?.props.parentPath;

  return routeParentPath
    ? flatChildren.find((c) => findRoute(c.props.path, routeParentPath))
    : routeToRender;
};

const findRoute = (path: string, currentPath: string, loose = false) =>
  parse(path, loose).pattern.exec(currentPath);

export const clearSlashUrl = (path: string) =>
  path === '/' ? path : path.replace(/\/$/, '');

export const getClearPathname = () => clearSlashUrl(location.pathname);

interface ChangeRouteConfig {
  replace?: boolean;
}

export const changeRoute = (path: string, config?: ChangeRouteConfig) => {
  config?.replace
    ? history.replaceState({ url: path }, '', path)
    : history.pushState({ url: path }, '', path);

  const routeChangeEvent = new Event(ROUTE_CHANGE_EVENT);
  dispatchEvent(routeChangeEvent);
};
