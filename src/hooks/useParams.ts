import { parse } from 'regexparam';
import { useRouter, useRoute } from '../contexts';

interface ParsedRoutePath {
  keys: string[];
  pattern: RegExp;
}

const getCurrentPathParams = (
  currentPath: string,
  { pattern, keys }: ParsedRoutePath,
) => {
  const matches = pattern.exec(currentPath);

  if (matches) {
    // Omit first 'matches' index as it's the full path string
    const paramsArray = keys.map((key, idx) => ({ [key]: matches[idx + 1] }));
    return Object.assign({}, ...paramsArray);
  }
};

export const useParams = <
  Params extends Record<string, string | undefined>,
>(): Partial<Params> => {
  const { fullRoutePath } = useRoute();
  const { currentPath } = useRouter();

  const fullRoutePathRegexp = parse(fullRoutePath);
  return getCurrentPathParams(currentPath, fullRoutePathRegexp);
};
