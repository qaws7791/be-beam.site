import { Tabs } from '@/components/atoms/tabs/Tabs';
import GuideBooksFilterDialog from '@/components/organisms/GuideBooksFilterDialog';
import GuideBooksFilterControls from '@/components/organisms/TargetTypeTab';
import GuideBooksContent from '@/components/sections/GuideBooksContent';
import useGuideBooksParams from '@/hooks/business/useGuideBooksParams';
import useGuidBookFilterDialog, {
  type FilterState,
} from '@/hooks/ui/useGuideBookFilterDialog';
import type { GuideBookType } from '@/types/components';

export function meta() {
  return [
    { title: '가이드북 페이지' },
    { name: 'description', content: '필요한 가이드북을 확인하세요!' },
  ];
}

export interface FilterOption {
  text: string;
  value: string;
}

export default function GuideBooks() {
  const {
    params,
    handleUpdateType,
    handleUpdateTargetType,
    handleUpdateLevel,
    handleUpdateTime,
  } = useGuideBooksParams();

  const {
    isOpen,
    setIsOpen,
    filter,
    setFilter,
    openDialog,
    closeDialog,
    updateFilter,
    resetFilter,
  } = useGuidBookFilterDialog(params);

  const allGuideBooks: GuideBookType[] = [];

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

  const handleApplyFilter = (filterState: FilterState) => {
    closeDialog();
    handleUpdateTargetType(filterState.targetType);
    handleUpdateLevel(filterState.level);
    handleUpdateTime(filterState.time);
    resetFilter();
  };

  console.log(filter);

  return (
    <div>
      <img
        src="https://placehold.co/1920x490"
        alt="가이드북 배너"
        className="h-[490px] w-full object-cover"
      />

      <div className="mx-auto w-full max-w-[1480px] py-16">
        <Tabs
          defaultValue="all"
          className="text-b1"
          value={params.type}
          onValueChange={handleUpdateType}
        >
          <GuideBooksFilterControls openDialog={openDialog} list={typeList} />
          <GuideBooksContent list={typeList} datas={allGuideBooks} />
        </Tabs>
      </div>

      <GuideBooksFilterDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        params={params}
        filter={filter}
        setFilter={setFilter}
        updateFilter={updateFilter}
        resetFilter={resetFilter}
        handleApplyFilter={handleApplyFilter}
      />
    </div>
  );
}
