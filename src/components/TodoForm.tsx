import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useState } from "react";

import { useGetCategoriesQuery } from "@/store/categorieApi";
import { Category } from "@/types";
const TodoForm = () => {
  const [todo, setTodo] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  console.log(categories);
  console.log("1", isLoading);

  console.log("2", isError);
  return (
    <div className={"flex gap-2"}>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Add a new todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <div>
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category: Category) => (
              <SelectItem key={category.name} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline">
        <Plus />
        Add{" "}
      </Button>
    </div>
  );
};
export default TodoForm;
