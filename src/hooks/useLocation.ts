import { useRouter } from '../contexts';

export const useLocation = () => {
  const { currentPath, search, state } = useRouter();
  return { path: currentPath, search, state };
};
