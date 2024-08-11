import * as React from 'react';
import { useLocation, useNavigate } from '../hooks';
import { useRoute } from '../contexts';
import { mergePaths } from '../utils';
import { NavigateConfig } from '../types';

interface StylesProps {
  isActive: boolean;
}

interface LinkProps
  extends Omit<React.ComponentPropsWithRef<'a'>, 'style' | 'className'>,
    NavigateConfig {
  path: string;
  style?: React.CSSProperties | ((props: StylesProps) => React.CSSProperties);
  className?: string | ((props: StylesProps) => string);
}

export const Link = ({
  path,
  replace = false,
  state,
  children,
  className,
  style,
  onClick,
  ...props
}: LinkProps) => {
  const { fullRoutePath } = useRoute();
  const { path: currentPath } = useLocation();
  const navigate = useNavigate();

  const fullLinkPath = path.startsWith('/')
    ? path
    : mergePaths(fullRoutePath, '/', path);

  const isActive = currentPath === fullLinkPath;

  const parametrizeCSS = <T,>(css: T) =>
    css instanceof Function ? css({ isActive }) : css;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(path, { replace, state });
  };

  return (
    <a
      href={path}
      onClick={handleClick}
      style={parametrizeCSS(style)}
      className={parametrizeCSS(className)}
      {...props}
    >
      {children}
    </a>
  );
};
