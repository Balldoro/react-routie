import { ROUTE_CHANGE_EVENT } from 'constants';

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
