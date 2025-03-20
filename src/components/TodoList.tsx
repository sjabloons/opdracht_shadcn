import {
  useGetTodosQuery,
  useToggleTodoMutation,
  useRemoveTodoMutation,
} from "@/store/todoApi";
import { useGetCategoriesQuery } from "@/store/categorieApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import TodoFilter from "@/components/TodoFilter";
import { Category, Todo } from "@/types";
import { toast } from "sonner";
import { ChevronDown, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
const TodoList = () => {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [toggleTodo] = useToggleTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();

  //filterstates
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all",
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const handleToggleTodo = async (todo: Todo) => {
    await toggleTodo(todo).unwrap();
    toast.success("Todo updated");
  };
  const handleRemoveTodo = async (todo: Todo) => {
    await removeTodo(todo).unwrap();
    toast.success("Todo deleted");
  };
  const filteredTodos = todos?.filter((todo: Todo) => {
    // Filter op categorie: als er een categorie is geselecteerd, moet todo.category hiermee overeenkomen

    if (selectedCategory === "all" && selectedStatus === "all") {
      return true;
    }
    const matchCategory =
      selectedCategory === "all" ? true : todo.category === selectedCategory;
    // Filter op status: als "completed" of "notCompleted" is geselecteerd, filter daarop
    let matchStatus = true;
    if (selectedStatus === "completed") {
      matchStatus = todo.completed === true;
    } else if (selectedStatus === "notCompleted") {
      matchStatus = todo.completed === false;
    }
    return matchCategory && matchStatus;
  });
  return (
    <div>
      {/* Render de filtercomponent en geef de filterstate door */}
      <TodoFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <div className="flex flex-col gap-2">
        {filteredTodos?.map((todo: Todo) => (
          <>
            <div key={todo.id} className="flex">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => {
                  handleToggleTodo(todo);
                }}
              />
              <p
                key={todo.id}
                className={`flex-1 ${todo.completed ? "line-through" : ""}`}
              >
                {todo.text}
              </p>
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
              <div>
                <Collapsible>
                  <CollapsibleTrigger>
                    <ChevronDown />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p>{todo.description}</p>
                  </CollapsibleContent>
                </Collapsible>
              </div>{" "}
              <div>
                <X onClick={() => handleRemoveTodo(todo)} />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
export default TodoList;
