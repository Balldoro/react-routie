import * as React from 'react';

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  path: string;
}

export const Link = ({ path, children, onClick, ...props }: LinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.pushState({ url: path }, '', path);

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
