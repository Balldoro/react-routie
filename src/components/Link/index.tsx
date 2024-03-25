import * as React from 'react';
import { changeRoute } from 'utils';

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  path: string;
  replace?: boolean;
}

export const Link = ({
  path,
  replace = false,
  children,
  onClick,
  ...props
}: LinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    changeRoute(path, { replace });
  };

  return (
    <a href={path} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
