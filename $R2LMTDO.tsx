import { useGetTodosQuery } from "@/store/Todosapi";
import { useGetCategoriesQuery } from "@/store/Todosapi";
import { Badge } from "./ui/badge";
import { Category, Todo } from "@/types";
import Description from "@/components/Description";

import { Checkbox } from "@/components/ui/checkbox";
import {
  useChangeTodosMutation,
  useRemoveTodosMutation,
} from "@/store/Todosapi";
import { X } from "lucide-react";

const TodoList = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery([]);
  const { data: categories } = useGetCategoriesQuery([]);
  const [changeTodos] = useChangeTodosMutation();
  const [removeTodos] = useRemoveTodosMutation();

  console.log(todos);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  const toggleTodo = async (id: number) => {
    const updateTodo = todos.find((todo: Todo) => todo.id === id);
    if (!updateTodo) {
      return;
    }
    try {
      await changeTodos({
        id: updateTodo.id,
        completed: !updateTodo.completed,
      }).unwrap();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const removeTodo = async (id: number) => {
    const deleteTodo = todos.find((todo: Todo) => todo.id === id);
    if (!deleteTodo) return;
    try {
      await removeTodos(id).unwrap();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      {todos.map((todo: Todo) => (
        <>
          <div key={todo.id} className="flex justify-between border-b p-1.5">
            <div className="flex gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <p className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </p>
            </div>
            <div className="ml-5 flex gap-2">
              {categories?.map((category: Category) => {
                return category.id === todo.category ? (
                  <div>
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

              <Description desc={todo.description} />
              <X color="#525151" onClick={() => removeTodo(todo.id)} />
            </div>
          </div>
        </>
      ))}
    </>
  );
};
export default TodoList;
