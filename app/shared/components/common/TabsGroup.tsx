import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import { cn } from '@/styles/tailwind';

interface TabsGroupProps {
  categories: {
    label: string;
    value: string;
  }[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  children?: React.ReactNode;
  classNames?: string;
}

export default function TabsGroup({
  categories,
  selectedCategory,
  onCategoryChange,
  children,
  classNames,
}: TabsGroupProps) {
  console.log('categories', categories);
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <div className={cn('relative w-full overflow-x-auto', classNames)}>
        <TabsList className="before:h-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="relative mx-3 cursor-pointer p-1 text-gray-600 after:h-0 after:transition-all after:duration-300 hover:text-black data-[state=active]:text-black"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {children}
    </Tabs>
  );
}
