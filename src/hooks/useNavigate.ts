import { useRouter } from '../contexts';
import { NavigateConfig } from '../types';
import { createRouteChangeEvent, mergePaths } from '../utils';

export const useNavigate = () => {
  const { currentPathWithQuery, basename } = useRouter();

  const navigate = (path: string, config?: NavigateConfig) => {
    const { replace, state } = config || {};
    const shouldReplace = replace || currentPathWithQuery === path;
    const newPath = mergePaths(basename, path);

    shouldReplace
      ? history.replaceState(state, '', newPath)
      : history.pushState(state, '', newPath);

    createRouteChangeEvent(state);
  };

  return navigate;
};
