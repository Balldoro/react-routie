import * as React from 'react';
import { parse } from 'regexparam';
import { ROUTE_CHANGE_EVENT } from 'constants';
import { ChangeRouteConfig, RoutePropsWithChildren } from 'types';

const flattenRoutes = (children: React.ReactNode[], parentPath = '') => {
  const allChildren: React.ReactElement<RoutePropsWithChildren>[] = [];

  for (let i = 0, length = children.length; i < length; i++) {
    const item = children[i];
    if (React.isValidElement<RoutePropsWithChildren>(item)) {
      const { path, children: nestedChildren } = item.props;
      const fullPath = mergePaths(parentPath, path);

      allChildren.push(
        React.cloneElement(item, { path: fullPath, parentPath }),
      );

      if (nestedChildren) {
        // Empty array casting to overwrite infered never[] type
        const childrenArray = ([] as React.ReactNode[]).concat(nestedChildren);
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

  const routeToRender = flatChildren.find(({ props }) =>
    findRoute(mergePaths(parentPath, props.path), currentPath),
  );

  const routeParentPath = routeToRender?.props.parentPath;

  return routeParentPath
    ? flatChildren.find(({ props }) => findRoute(props.path, routeParentPath))
    : routeToRender;
};

const findRoute = (path: string, currentPath: string, loose = false) =>
  parse(path, loose).pattern.exec(currentPath);

export const clearSlashUrl = (path: string) =>
  path === '/' ? path : path.replace(/\/$/, '');

export const getClearPathname = () => clearSlashUrl(location.pathname);

export const mergePaths = (...paths: string[]) => paths.join('');

export const changeRoute = (path: string, config?: ChangeRouteConfig) => {
  config?.replace
    ? history.replaceState({ url: path }, '', path)
    : history.pushState({ url: path }, '', path);

  const routeChangeEvent = new Event(ROUTE_CHANGE_EVENT);
  dispatchEvent(routeChangeEvent);
};
