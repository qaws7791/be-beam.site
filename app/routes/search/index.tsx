import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import { metaTemplates } from '@/shared/config/meta-templates';
import type { Route } from '.react-router/types/app/routes/search/+types';
import AllSearchResults from '@/routes/search/_components/AllSearchResults';
import MeetingSearchResults from '@/routes/search/_components/MeetingSearchResults';
import GuidebookSearchResults from '@/routes/search/_components/GuidebookSearchResults';
import HostsSearchResults from '@/routes/search/_components/HostsSearchResults';
import useSearchPage from '@/routes/search/_hooks/useSearchPage';

export function meta({ data }: Route.MetaArgs) {
  return metaTemplates.search({ query: data?.query || undefined });
}

export function loader(args: Route.LoaderArgs) {
  const searchParams = new URL(args.request.url).searchParams;
  const query = searchParams.get('q');
  return {
    query: query || undefined,
  };
}

export default function Search() {
  const { query, tab, handleTabChange } = useSearchPage();
  return (
    <div className="mx-auto w-full pt-25 pb-16">
      <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
        <div className="mx-auto flex w-full justify-center bg-gray-100">
          <TabsList className="w-full max-w-[1480px]">
            <TabsTrigger value="all">통합 검색</TabsTrigger>
            <TabsTrigger value="meeting">모임</TabsTrigger>
            <TabsTrigger value="guide">가이드북</TabsTrigger>
            <TabsTrigger value="host">호스트</TabsTrigger>
          </TabsList>
        </div>
        <div className="mx-auto flex w-full max-w-[1480px] justify-center">
          <TabsContent value="all" className="mt-20 flex flex-col gap-20">
            <AllSearchResults query={query} />
          </TabsContent>
          <TabsContent value="meeting" className="mt-20 flex flex-col gap-20">
            <MeetingSearchResults query={query} />
          </TabsContent>
          <TabsContent value="guide" className="mt-20 flex flex-col gap-20">
            <GuidebookSearchResults query={query} />
          </TabsContent>
          <TabsContent value="host" className="mt-20 flex flex-col gap-20">
            <HostsSearchResults query={query} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
