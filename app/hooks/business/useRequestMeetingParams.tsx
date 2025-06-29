import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export interface useRequestMeetingParamsType {
  params: {
    status: 'pending' | 'approved' | 'rejected';
    page: number;
  };
  handleUpdateStatus: (status: string) => void;
  handleUpdatePage: (page: number) => string;
}

export default function useRequestMeetingParams(): useRequestMeetingParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return {
      status: (searchParams.get('status') ||
        'pending') as useRequestMeetingParamsType['params']['status'],
      page: (searchParams.get('page') ||
        1) as useRequestMeetingParamsType['params']['page'],
    };
  }, [searchParams]);

  const handleUpdateStatus = (status: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('status', status);
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

  return { params, handleUpdateStatus, handleUpdatePage };
}
