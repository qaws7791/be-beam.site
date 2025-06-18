import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export default function useReviewsParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const tab = searchParams.get('tab') || 'all';
    const sort = searchParams.get('sort') || 'latest';
    const onlyImage = searchParams.get('onlyImage') === 'true';
    const rating = Number(searchParams.get('rating') || 0);
    return {
      tab,
      sort,
      onlyImage,
      rating,
    };
  }, [searchParams]);

  const handleUpdateTab = (tab: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('tab', tab);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdateSort = (sort: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('sort', sort);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdateOnlyImage = (onlyImage: boolean) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('onlyImage', onlyImage.toString());
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdateRating = (rating: number) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('rating', rating.toString());
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  return {
    params,
    handleUpdateTab,
    handleUpdateSort,
    handleUpdateOnlyImage,
    handleUpdateRating,
  };
}
