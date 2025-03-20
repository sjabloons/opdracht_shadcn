// TodoFilter.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { useGetCategoriesQuery } from "@/store/categorieApi";

type TodoFilterProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
};

const TodoFilter = ({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: TodoFilterProps) => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="flex gap-2">
      <div>
        <Select onValueChange={(id) => setSelectedCategory(id)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories?.map((category: Category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select onValueChange={(status) => setSelectedStatus(status)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Complete</SelectItem>
              <SelectItem value="notCompleted">Not Complete</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TodoFilter;
