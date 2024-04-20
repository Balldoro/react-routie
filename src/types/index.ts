export interface RouteProps {
  path: string;
  page: React.ReactNode;
  children?: React.ReactNode;
}

export interface RoutePropsWithParent extends RouteProps {
  parentPath?: string;
}

export type RouteState = PopStateEventInit['state'];
