import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../atoms/dropdown-menu/DropdownMenu';
import type { FiltersType } from '@/types/components';

interface DropdownMenuGroupProps {
  datas: FiltersType[];
  selectedFilters: Record<string, string>;
  onDropdownChange: (
    updater: (prev: Record<string, string>) => Record<string, string>,
  ) => void;
}

export default function DropdownMenuGroup({
  datas,
  selectedFilters,
  onDropdownChange,
}: DropdownMenuGroupProps) {
  return (
    <div className="flex w-full gap-3 overflow-x-auto">
      {datas.map((item) => {
        const selectedValue = selectedFilters[item.label] ?? 'all';
        return (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 bg-gray-200 px-3 py-[6px] text-b1 font-medium whitespace-nowrap text-black outline-none">
              {item.options[item.values.indexOf(selectedValue)]}
              <img src="/images/icons/fillDropDown.svg" alt="dropDown_icon" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-24 bg-gray-200">
              {item.options.map((option, idx) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={option}
                  onSelect={() =>
                    onDropdownChange((prev) => ({
                      ...prev,
                      [item.label]: item.values[idx],
                    }))
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
