import { useGetTodosQuery } from "@/store/todoApi";
import { useGetCategoriesQuery } from "@/store/categorieApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Category, Todo } from "@/types";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
const TodoList = () => {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();
  return (
    <div className="flex flex-col gap-2">
      {todos?.map((todo: Todo) => (
        <>
          <div key={todo.id} className="flex">
            <Checkbox />
            <div key={todo.id}>{todo.text}</div>

            <div className="ml-5 flex gap-2">
              {categories?.map((category: Category) => {
                return category.id === todo.category ? (
                  <div key={category.id}>
                    <Badge
                      style={{ backgroundColor: category.color }}
                      variant="outline"
                    >
                      {category.name}
                    </Badge>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
          <Collapsible>
            <CollapsibleTrigger>
              <ChevronDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>{todo.description}</p>
            </CollapsibleContent>
          </Collapsible>
        </>
      ))}
    </div>
  );
};
export default TodoList;
