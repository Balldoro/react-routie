import { useRouter } from '../contexts';
import { NavigateConfig } from '../types';
import { createRouteChangeEvent } from '../utils';

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
