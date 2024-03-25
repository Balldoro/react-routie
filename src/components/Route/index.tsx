import * as React from 'react';
import { useRouter } from 'contexts';
import { clearSlashUrl } from 'utils';

export interface RouteProps {
  path: string;
  parentPath: string;
  page: React.ReactNode;
  children: React.ReactElement<{ parentPath: string }>;
}

export const Route = ({ path, page, children }: RouteProps) => {
  const { currentPath } = useRouter();

  const readyPath = clearSlashUrl(path);

  if (currentPath === readyPath) return page;

  if (currentPath.startsWith(readyPath) && children) {
    return React.Children.map(
      children,
      (child) =>
        React.isValidElement(child) &&
        React.cloneElement(child, {
          parentPath: readyPath,
        }),
    );
  }

  return null;
};
