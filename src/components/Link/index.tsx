import * as React from 'react';
import { useNavigate } from 'hooks';

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
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(path, { replace });
  };

  return (
    <a href={path} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
