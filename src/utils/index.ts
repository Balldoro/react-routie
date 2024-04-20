import * as React from 'react';
import { parse } from 'regexparam';
import { POP_STATE_EVENT, ROUTE_CHANGE_EVENT } from '../constants';
import { RouteListenersEvent, RoutePropsWithParent } from '../types';
import { Route } from '../components/Route';

const flattenRoutes = (children: React.ReactNode[], parentPath = '') => {
  const allChildren: React.ReactElement<RoutePropsWithParent>[] = [];

  for (let i = 0, length = children.length; i < length; i++) {
    const item = children[i];
    if (React.isValidElement<RoutePropsWithParent>(item)) {
      handleIncorrectRouteType(item.type);

      const { path, children: nestedChildren } = item.props;
      const fullPath = mergePaths(parentPath, path);

      if (item.type === Route) {
        allChildren.push(
          React.cloneElement(item, { path: fullPath, parentPath }),
        );
      }

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
    findRoute(mergePaths(parentPath, props.path), clearSlashUrl(currentPath)),
  );

  const routeParentPath = routeToRender?.props.parentPath;

  return routeParentPath
    ? flatChildren.find(({ props }) => findRoute(props.path, routeParentPath))
    : routeToRender;
};

const handleIncorrectRouteType = (elType: React.ReactElement['type']) => {
  if (elType !== Route && elType !== React.Fragment) {
    throw new Error(
      `Oops! ${elType} element detected! Only Route components are allowed as Router and Route children`,
    );
  }
};

const findRoute = (path: string, currentPath: string, loose = false) =>
  parse(path, loose).pattern.exec(currentPath);

const clearSlashUrl = (path: string) =>
  path === '/' ? path : path.replace(/\/$/, '');

export const mergePaths = (...paths: string[]) => paths.join('');

export const createRouteChangeEvent = () => {
  const routeChangeEvent = new Event(ROUTE_CHANGE_EVENT);
  dispatchEvent(routeChangeEvent);
};

export const setupListeners = (
  handleListener: (e: RouteListenersEvent) => void,
) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, handleListener);
  window.addEventListener(POP_STATE_EVENT, handleListener);

  return () => {
    window.removeEventListener(ROUTE_CHANGE_EVENT, handleListener);
    window.removeEventListener(POP_STATE_EVENT, handleListener);
  };
};

export const getSearchParams = (search: string) =>
  Object.fromEntries(new URLSearchParams(search));
