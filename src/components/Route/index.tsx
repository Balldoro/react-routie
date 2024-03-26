import * as React from 'react';

export interface RouteProps {
  path: string;
  parentPath: string;
  page: React.ReactNode;
  children: React.ReactElement<{ parentPath: string }>;
}

export const Route = ({ page }: RouteProps) => {
  return page;
};
