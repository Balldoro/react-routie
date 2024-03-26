export interface RouteProps {
  path: string;
  parentPath: string;
  page: React.ReactNode;
}

export interface RoutePropsWithChildren extends RouteProps {
  children?: React.ReactNode;
}

export type RouteListenersEvent = CustomEvent<{ url: string }> | PopStateEvent;
