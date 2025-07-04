import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export interface useCreatedMeetingParamsType {
  params: {
    type: 'regular' | 'small';
    page: number;
  };
  handleUpdateType: (type: string) => void;
  handleUpdatePage: (page: number) => string;
}

export default function useCreatedMeetingParams(): useCreatedMeetingParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return {
      type: (searchParams.get('type') ||
        'regular') as useCreatedMeetingParamsType['params']['type'],
      page: (searchParams.get('page') ||
        1) as useCreatedMeetingParamsType['params']['page'],
    };
  }, [searchParams]);

  const handleUpdateType = (type: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('type', type);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdatePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };

  return { params, handleUpdateType, handleUpdatePage };
}
