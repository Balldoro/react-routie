import { useRouter } from 'contexts';
import { createRouteChangeEvent } from 'utils';

interface NavigateConfig {
  replace?: boolean;
}

export const useNavigate = () => {
  const { currentPath } = useRouter();

  const navigate = (path: string, config?: NavigateConfig) => {
    const shouldReplace = config?.replace || currentPath === path;
    const state = { url: path };

    shouldReplace
      ? history.replaceState(state, '', path)
      : history.pushState(state, '', path);

    createRouteChangeEvent();
  };

  return navigate;
};
