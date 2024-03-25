import * as React from 'react';

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
    replace
      ? history.replaceState({ url: path }, '', path)
      : history.pushState({ url: path }, '', path);

    const routeChangeEvent = new Event('routechange');
    dispatchEvent(routeChangeEvent);

    onClick?.(e);
  };

  return (
    <a href={path} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
