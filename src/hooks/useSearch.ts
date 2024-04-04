import { getSearchParams } from '../utils';
import { useRouter } from '../contexts';

export const useSearch = () => {
  const { search } = useRouter();

  const searchParams = getSearchParams(search);

  return [searchParams, location.search];
};
