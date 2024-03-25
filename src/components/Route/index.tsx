import { useRouter } from 'contexts';

export interface RouteProps {
  path: string;
  page: React.ReactNode;
}

export const Route = ({ path, page }: RouteProps) => {
  const { currentPath } = useRouter();

  return currentPath === path ? page : null;
};
