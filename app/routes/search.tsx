import ArrowRightIcon from '@/components/atoms/icons/ArrowRightIcon';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import Text from '@/components/atoms/text/Text';
import HostCard from '@/components/molecules/HostCard';
import MeetingCard from '@/components/organisms/MeetingCard';
import { Link, useSearchParams } from 'react-router';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const tab = searchParams.get('tab') || 'all';
  console.log(query);
  return (
    <div className="mx-auto w-full pt-25 pb-16">
      <Tabs
        defaultValue={tab}
        value={tab}
        onValueChange={(value) =>
          setSearchParams((searchParams) => {
            searchParams.set('tab', value);
            return searchParams;
          })
        }
      >
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
            <MeetingSection />
            <GuideBookSection />
            <HostSection />
          </TabsContent>
          <TabsContent value="meeting" className="mt-20 flex flex-col gap-20">
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-h2">모임</h2>
                  <span className="text-b2">N건</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-5">
                {Array.from({ length: 20 }).map((_, index) => (
                  <MeetingCard
                    key={index}
                    image="https://placehold.co/600x400"
                    meetingType="일반 모임"
                    recruitmentType="모집 중"
                    name="모임 이름"
                    meetingStartTime="2025-07-08"
                    address="부산 동래구 복천동"
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="guide" className="mt-20 flex flex-col gap-20">
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-h2">가이드북</h2>
                  <span className="text-b2">N건</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-5">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Link
                    className="w-full cursor-pointer overflow-hidden rounded-3xl border-1 border-gray-300"
                    key={index}
                    to={`/guideBook/${index}`}
                  >
                    <img
                      className="h-[240px] w-full object-cover"
                      src="https://placehold.co/600x400"
                      alt="guidBook_thumbnail"
                    />
                    <div className="box-border w-full border-t-1 border-gray-300 px-7 py-8">
                      <Text variant="T2_Semibold" className="truncate">
                        가이드북 이름
                      </Text>
                      <Text
                        variant="T4_Regular"
                        color="gray-700"
                        className="mt-3 truncate"
                      >
                        가이드북 설명
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="host" className="mt-20 flex flex-col gap-20">
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-h2">호스트</h2>
                  <span className="text-b2">N건</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-5">
                {Array.from({ length: 20 }).map((_, index) => (
                  <HostCard
                    key={index}
                    host={{
                      profileImage: 'https://placehold.co/600x400',
                      nickname: '호스트 이름',
                      introduction: '호스트 소개',
                    }}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function MeetingSection() {
  const [, setSearchParams] = useSearchParams();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-h2">모임</h2>
          <span className="text-b2">N건</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="text-t3 text-gray-600"
            onClick={() =>
              setSearchParams((searchParams) => {
                searchParams.set('tab', 'meeting');
                return searchParams;
              })
            }
          >
            전체보기
          </button>
          <ArrowRightIcon className="size-6 text-gray-600" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <MeetingCard
            key={index}
            image="https://placehold.co/600x400"
            meetingType="일반 모임"
            recruitmentType="모집 중"
            name="모임 이름"
            meetingStartTime="2025-07-08"
            address="부산 동래구 복천동"
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

function GuideBookSection() {
  const [, setSearchParams] = useSearchParams();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-h2">가이드북</h2>
          <span className="text-b2">N건</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="text-t3 text-gray-600"
            onClick={() =>
              setSearchParams((searchParams) => {
                searchParams.set('tab', 'guide');
                return searchParams;
              })
            }
          >
            전체보기
          </button>
          <ArrowRightIcon className="size-6 text-gray-600" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Link
            className="w-full cursor-pointer overflow-hidden rounded-3xl border-1 border-gray-300"
            key={index}
            to={`/guideBook/${index}`}
          >
            <img
              className="h-[240px] w-full object-cover"
              src="https://placehold.co/600x400"
              alt="guidBook_thumbnail"
            />
            <div className="box-border w-full border-t-1 border-gray-300 px-7 py-8">
              <Text variant="T2_Semibold" className="truncate">
                가이드북 이름
              </Text>
              <Text
                variant="T4_Regular"
                color="gray-700"
                className="mt-3 truncate"
              >
                가이드북 설명
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function HostSection() {
  const [, setSearchParams] = useSearchParams();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-h2">호스트</h2>
          <span className="text-b2">N건</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="text-t3 text-gray-600"
            onClick={() =>
              setSearchParams((searchParams) => {
                searchParams.set('tab', 'host');
                return searchParams;
              })
            }
          >
            전체보기
          </button>
          <ArrowRightIcon className="size-6 text-gray-600" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <HostCard
            key={index}
            host={{
              profileImage: 'https://placehold.co/600x400',
              nickname: '호스트 이름',
              introduction: '호스트 소개',
            }}
          />
        ))}
      </div>
    </div>
  );
}
