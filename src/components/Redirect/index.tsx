import * as React from 'react';
import { changeRoute } from 'utils';

interface RedirectProps {
  path: string;
  replace?: boolean;
}

export const Redirect = ({ path, replace = false }: RedirectProps) => {
  React.useEffect(() => {
    changeRoute(path, { replace });
  }, [path, replace]);

  return null;
};
