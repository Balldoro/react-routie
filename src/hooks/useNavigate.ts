import { RouteState } from '../types';
import { useRouter } from '../contexts';
import { createRouteChangeEvent } from '../utils';

interface NavigateConfig {
  replace?: boolean;
  state?: RouteState;
}

export const useNavigate = () => {
  const { currentPathWithQuery } = useRouter();

  const navigate = (path: string, config?: NavigateConfig) => {
    const { replace, state } = config || {};
    const shouldReplace = replace || currentPathWithQuery === path;

    shouldReplace
      ? history.replaceState(state, '', path)
      : history.pushState(state, '', path);

    createRouteChangeEvent(state);
  };

  return navigate;
};
