import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export default function useSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const tab = searchParams.get('tab') || 'all';

  const handleTabChange = useCallback(
    (value: string) => {
      setSearchParams((searchParams) => {
        searchParams.set('tab', value);
        return searchParams;
      });
    },
    [setSearchParams],
  );

  return {
    query,
    tab,
    handleTabChange,
  };
}
