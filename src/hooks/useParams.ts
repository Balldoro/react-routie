import { parse } from 'regexparam';
import { useRouter, useRoute } from '../contexts';

interface ParsedRoutePath {
  keys: string[];
  pattern: RegExp;
}

const getCurrentParams = (
  currentPath: string,
  { pattern, keys }: ParsedRoutePath,
) => {
  const pathMatches = pattern.exec(currentPath);

  if (pathMatches) {
    // Omit first 'pathMatches' index as it's the full path string
    const paramPairs = keys.map((key, idx) => [key, pathMatches[idx + 1]]);
    return Object.fromEntries(paramPairs);
  }
};

export const useParams = <
  Params extends Record<string, string | undefined>,
>(): Partial<Params> => {
  const { fullRoutePath } = useRoute();
  const { currentPath } = useRouter();

  const fullRoutePathRegexp = parse(fullRoutePath);
  return getCurrentParams(currentPath, fullRoutePathRegexp);
};
