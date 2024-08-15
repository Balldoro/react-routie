import * as React from 'react';
import { parse } from 'regexparam';
import { RoutePropsWithParent } from '../types';
import { Route } from '../components/Route';

const findRoute = (path: string, currentPath: string, loose = false) =>
  parse(path, loose).pattern.exec(removeTrailingSlash(currentPath));

const removeTrailingSlash = (path: string) =>
  path === '/' ? path : path.replace(/\/$/, '');

export const mergePaths = (...paths: string[]) => paths.join('');

const throwOnInvalidChildType = (type: React.ReactElement['type']) => {
  if (type !== Route && type !== React.Fragment) {
    throw new Error(
      `Oops! ${type} element detected! Only Route components are allowed as Router and Route children`,
    );
  }
};

const flattenChildren = (children: React.ReactNode[], parentPath = '') => {
  const flatChildren: React.ReactElement<RoutePropsWithParent>[] = [];

  children.forEach((child) => {
    if (React.isValidElement<RoutePropsWithParent>(child)) {
      throwOnInvalidChildType(child.type);

      const { path, children: nestedChildren } = child.props;

      if (child.type === Route) {
        const fullPath = mergePaths(parentPath, path);
        flatChildren.push(
          React.cloneElement(child, { path: fullPath, parentPath }),
        );
      }

      if (nestedChildren) {
        // Empty array casting to overwrite infered never[] type
        const nestedChildrenArray = ([] as React.ReactNode[]).concat(
          nestedChildren,
        );
        flatChildren.push(...flattenChildren(nestedChildrenArray, path));
      }
    }
  });

  return flatChildren;
};

export const renderMatchingRoute = (
  routes: React.ReactNode,
  currentPath: string,
  routesParentPath = '',
) => {
  const flattenedRoutes = flattenChildren(React.Children.toArray(routes));

  const matchingRoute = flattenedRoutes.find(({ props: { path } }) =>
    findRoute(mergePaths(routesParentPath, path), currentPath),
  );
  const matchingRouteParentPath = matchingRoute?.props.parentPath;

  return matchingRouteParentPath
    ? flattenedRoutes.find(({ props: { path } }) =>
        findRoute(path, matchingRouteParentPath),
      )
    : matchingRoute;
};

export const createRouteChangeEvent = (state?: PopStateEventInit['state']) => {
  dispatchEvent(new PopStateEvent('popstate', { state }));
};

export const subscribePopstate = (callback: (e: PopStateEvent) => void) => {
  window.addEventListener('popstate', callback);

  return () => {
    window.removeEventListener('popstate', callback);
  };
};

export const getSearchParams = (search: string) =>
  Object.fromEntries(new URLSearchParams(search));

const createLocationSnapshot = () => ({
  currentPath: location.pathname,
  search: location.search,
  state: history.state,
});

type LocationSnapshot = ReturnType<typeof createLocationSnapshot>;

const areLocationSnapshotsEqual = (
  prevSnapshot: LocationSnapshot,
  nextSnapshot: LocationSnapshot,
) => {
  const isEqual = Object.entries(prevSnapshot).every(
    ([key, value]) => nextSnapshot[key as keyof LocationSnapshot] === value,
  );
  return isEqual;
};

export const getLocationSnapshot = () => {
  let lastSnapshot = createLocationSnapshot();

  return () => {
    const currentSnapshot = createLocationSnapshot();

    if (!areLocationSnapshotsEqual(lastSnapshot, currentSnapshot)) {
      lastSnapshot = currentSnapshot;
    }
    return lastSnapshot;
  };
};
