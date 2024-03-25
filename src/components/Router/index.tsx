import * as React from 'react';
import { RouterContextProvider } from 'contexts/RouterContext';

interface RouterProps {
  children: React.ReactNode;
}

export const Router = ({ children }: RouterProps) => {
  return <RouterContextProvider>{children}</RouterContextProvider>;
};
