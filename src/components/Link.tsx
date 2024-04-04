import * as React from 'react';
import { useNavigate } from '../hooks';
import { useRoute, useRouter } from '../contexts';
import { mergePaths } from '../utils';

interface StylesProps {
  isActive: boolean;
}

interface LinkProps
  extends Omit<React.ComponentPropsWithRef<'a'>, 'style' | 'className'> {
  path: string;
  replace?: boolean;
  style?: React.CSSProperties | ((props: StylesProps) => React.CSSProperties);
  className?: string | ((props: StylesProps) => string);
}

export const Link = ({
  path,
  replace = false,
  children,
  className,
  style,
  onClick,
  ...props
}: LinkProps) => {
  const { fullRoutePath } = useRoute();
  const { currentPath } = useRouter();
  const navigate = useNavigate();

  const fullLinkPath = path.startsWith('/')
    ? path
    : mergePaths(fullRoutePath, '/', path);

  const isActive = currentPath === fullLinkPath;

  const getStylesWithProps = <T,>(styles: T) =>
    styles instanceof Function ? styles({ isActive }) : styles;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(path, { replace });
  };

  return (
    <a
      href={path}
      onClick={handleClick}
      style={getStylesWithProps(style)}
      className={getStylesWithProps(className)}
      {...props}
    >
      {children}
    </a>
  );
};
