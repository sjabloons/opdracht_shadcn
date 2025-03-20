import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useState } from "react";

import { useGetCategoriesQuery } from "@/store/categorieApi";
import { useAddTodoMutation } from "@/store/todoApi";
import { Category } from "@/types";
import { toast } from "sonner";
import { nanoid } from "@reduxjs/toolkit";
const TodoForm = () => {
  const [todo, setTodo] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [addTodo] = useAddTodoMutation();
  console.log(categories);
  console.log("1", isLoading);

  console.log("2", isError);
  const handleAddTodo = async () => {
    try {
      await addTodo({
        id: nanoid(),
        text: todo,
        category: category,
        completed: false,
        description: "",
      }).unwrap();
    } catch (error) {
      toast.error("Error adding todo");
    }
  };
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
        <Select onValueChange={(id) => setCategory(id)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories?.map((category: Category) => (
              <SelectItem key={category.name} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={handleAddTodo}>
        <Plus />
        Add{" "}
      </Button>
    </div>
  );
};
export default TodoForm;
