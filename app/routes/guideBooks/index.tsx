import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  GuideBookListFilterSchema,
  type GuideBookListFilters,
} from '@/features/guidebooks/schemas/guideBooksFilters';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import { metaTemplates } from '@/shared/config/meta-templates';
import { guideBooksInfiniteQueryOptions } from '@/features/guidebooks/hooks/useGuideBooksQuery';

import type { Route } from '.react-router/types/app/routes/guideBooks/+types';
import type { FilterOption } from '@/shared/types/components';
import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import Banner from '@/shared/components/common/Banner';
import { Tabs } from '@/shared/components/ui/Tabs';
import GuideBooksFilterControls from '@/routes/guideBooks/_components/TargetTypeTab';
// import SearchInput from '@/components/molecules/SearchInput';
import GuideBooksContent from '@/routes/guideBooks/_components/GuideBooksContent';

export function meta() {
  return metaTemplates.guideBooks();
}

export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: GuideBookListFilters = GuideBookListFilterSchema.parse({
    ...rawFilters,
  });

  await queryClient.prefetchInfiniteQuery(
    guideBooksInfiniteQueryOptions(parsedFilters),
  );

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
    filters: parsedFilters,
  };
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: GuideBookListFilters = GuideBookListFilterSchema.parse({
    ...rawFilters,
  });

  await queryClient.prefetchInfiniteQuery(
    guideBooksInfiniteQueryOptions(parsedFilters),
  );

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
    filters: parsedFilters,
  };
}

export default function GuideBooks({ loaderData }: Route.ComponentProps) {
  const { dehydratedState, filters: initialFilters } = loaderData;
  const { filters, setFilter } = useUrlFilters(
    GuideBookListFilterSchema,
    initialFilters,
  );

  const typeList: FilterOption[] = [
    {
      text: '전체',
      value: 'all',
    },
    {
      text: '소통',
      value: 'communication',
    },
    {
      text: '참여 유도',
      value: 'engagement',
    },
    {
      text: '프로그램 기획',
      value: 'planning',
    },
    {
      text: '운영',
      value: 'support',
    },
    {
      text: '운영 지원',
      value: 'operation',
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate className="pt-23 pb-10 lg:pt-41 lg:pb-16">
        <Banner
          imageUrl="/images/guideBook_banner.png"
          height="h-[365px]"
          className="hidden lg:block"
        />
        <Banner
          imageUrl="/images/m_guideBook_banner.png"
          height="h-[220px]"
          className="lg:hidden"
        />

        <div className="mt-6 w-full md:mt-10 lg:mt-16">
          <Tabs
            defaultValue="all"
            className="text-b1"
            value={filters.type}
            onValueChange={(value) =>
              setFilter({
                type: value as
                  | 'all'
                  | 'communication'
                  | 'engagement'
                  | 'planning'
                  | 'operation'
                  | 'support',
              })
            }
          >
            <GuideBooksFilterControls
              list={typeList}
              initialFilters={initialFilters}
            />
            <GuideBooksContent list={typeList} filters={filters} />
          </Tabs>
        </div>

        {/* API 수정 완료시 활성화 */}
        {/* <SearchInput
              placeHolder="입력해주세요"
              inputStyle="w-full max-w-[400px] px-4 py-3 border-1 border-gray-300 rounded-full"
              onSearchChange={setFilter}
              search={filters.search}
        /> */}
      </CommonTemplate>
    </HydrationBoundary>
  );
}
