import { useGetTodosQuery } from "@/store/todoApi";
import { useGetCategoriesQuery } from "@/store/categorieApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Category, Todo } from "@/types";
const TodoList = () => {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();
  return (
    <div className="flex flex-col gap-2">
      {todos?.map((todo: Todo) => (
        <>
          <div className="flex">
            <Checkbox />
            <div key={todo.id}>{todo.text}</div>

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
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
export default TodoList;
