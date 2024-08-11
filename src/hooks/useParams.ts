import { parse } from 'regexparam';
import { useRouter, useRoute } from '../contexts';

type Params = Record<string, string>;

export const useParams = <T extends Params>(): Partial<T> => {
  const { fullRoutePath } = useRoute();
  const { currentPath } = useRouter();

  const { pattern, keys } = parse(fullRoutePath);
  const pathMatches = pattern.exec(currentPath);

  if (!pathMatches) return {};

  // Omit first 'pathMatches' index as it's the full path string
  const paramPairs = keys.map((key, idx) => [key, pathMatches[idx + 1]]);
  return Object.fromEntries(paramPairs);
};
