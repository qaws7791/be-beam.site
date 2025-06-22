import type { FiltersType } from '@/types/components';
import DropdownMenuGroup from '../molecules/DropdownMenuGroup';
import SearchInput from '../molecules/SearchInput';
import TabsGroup from '../molecules/TabsGroup';

interface MeetingFilterControlsProps {
  filters: FiltersType[];
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedFilters: Record<string, string>;
  setSelectedFilters: (
    updater: (prev: Record<string, string>) => Record<string, string>,
  ) => void;
  search: string;
  setSearch: (search: string) => void;
}

export default function MeetingFilterControls({
  filters,
  selectedTopic,
  setSelectedTopic,
  selectedFilters,
  setSelectedFilters,
  search,
  setSearch,
}: MeetingFilterControlsProps) {
  const topics = [
    { label: '전체', value: 'all' },
    { label: '소셜 다이닝', value: '소셜 다이닝' },
    { label: '독서 · 글쓰기', value: '독서 · 글쓰기' },
    { label: '사진', value: '사진' },
    { label: '운동 · 야외활동', value: '운동 · 야외활동' },
    { label: '문화탐방', value: '문화탐방' },
    { label: '환경 · 제로웨이스트', value: '환경 · 제로웨이스트' },
    { label: '언어 · 스터디', value: '언어 · 스터디' },
    { label: '기타', value: '기타' },
  ];

  return (
    <div className="mt-12">
      <TabsGroup
        categories={topics}
        selectedCategory={selectedTopic}
        onCategoryChange={setSelectedTopic}
      />

      <div className="mt-8 flex w-full items-center justify-between">
        <DropdownMenuGroup
          datas={filters}
          selectedFilters={selectedFilters}
          onDropdownChange={setSelectedFilters}
        />
        <SearchInput
          placeHolder="입력해주세요"
          inputStyle="w-full max-w-[400px] px-4 py-3 border-1 border-gray-300 rounded-full"
          onSearchChange={setSearch}
          search={search}
        />
      </div>
    </div>
  );
}
