import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/DropdownMenu';
import type { FiltersType } from '@/shared/types/components';

interface DropdownMenuGroupProps {
  datas: FiltersType[];
  selectedFilters: Record<string, string>;
  onDropdownChange: (newFilter: Partial<MeetingListFilters>) => void;
}

export default function DropdownMenuGroup({
  datas,
  selectedFilters,
  onDropdownChange,
}: DropdownMenuGroupProps) {
  return (
    <div className="flex w-full gap-3 overflow-x-auto">
      {datas.map((item) => {
        const selectedValue = selectedFilters[item.label];

        const triggerLabel =
          selectedValue === item.defaultOption
            ? item.defaultLabel
            : item.options[item.values.indexOf(selectedValue)];
        return (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 bg-gray-200 px-3 py-[6px] text-b1 font-medium whitespace-nowrap text-black outline-none">
              {triggerLabel}
              <img src="/images/icons/fillDropDown.svg" alt="dropDown_icon" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-24 bg-gray-200">
              {item.options.map((option, idx) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={option}
                  onSelect={() =>
                    onDropdownChange({ [item.label]: item.values[idx] })
                  }
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}
