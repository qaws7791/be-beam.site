import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs/Tabs';

interface Category {
  label: string;
  value: string;
}

interface TabsGroupProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  children?: React.ReactNode;
}

export default function TabsGroup({
  categories,
  selectedCategory,
  onCategoryChange,
  children,
}: TabsGroupProps) {
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <div className="relative w-full">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="relative mx-3 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-black after:transition-all after:duration-300 after:content-[''] data-[state=active]:after:scale-x-100"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gray-300" />
      </div>

      {children}
    </Tabs>
  );
}
