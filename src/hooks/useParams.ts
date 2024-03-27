import { parse } from 'regexparam';
import { useRouter, useRoute } from 'contexts';

interface ParsedRoutePath {
  keys: string[];
  pattern: RegExp;
}

const getCurrentPathParams = (
  currentPath: string,
  { pattern, keys }: ParsedRoutePath,
) => {
  const params: Record<string, string | null> = {};
  const matches = pattern.exec(currentPath);

  if (matches) {
    // Omit first matches index as it's the full path string
    keys.forEach((key, idx) => (params[key] = matches[idx + 1] || null));
  }
  return params;
};

export const useParams = () => {
  const { fullRoutePath } = useRoute();
  const { currentPath } = useRouter();

  const fullRoutePathRegexp = parse(fullRoutePath);
  return getCurrentPathParams(currentPath, fullRoutePathRegexp);
};
