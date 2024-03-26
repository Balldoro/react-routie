import * as React from 'react';
import { useNavigate } from 'hooks';

interface RedirectProps {
  path: string;
  replace?: boolean;
}

export const Redirect = ({ path, replace = false }: RedirectProps) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(path, { replace });
  }, [path, navigate, replace]);

  return null;
};
