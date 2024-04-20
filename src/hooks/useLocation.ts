import { useRouter } from '../contexts';

export const useLocation = () => {
  const { currentPath, search } = useRouter();
  return { path: currentPath, search };
};
