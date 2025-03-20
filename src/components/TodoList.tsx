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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
const TodoList = () => {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [toggleTodo] = useToggleTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState<number>(() => {
    const totalPerPage = localStorage.getItem("totalPerPage");
    return totalPerPage ? parseInt(totalPerPage) : 5;
  });

  // Filterstates: standaard op "all" zodat alle todo's zichtbaar zijn bij het laden.
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

  // Filterlogica: Als beide filters op "all" staan, geef dan alle todo's terug.
  const filteredTodos = todos?.filter((todo: Todo) => {
    if (selectedCategory === "all" && selectedStatus === "all") {
      return true;
    }
    const matchCategory =
      selectedCategory === "all" ? true : todo.category === selectedCategory;
    let matchStatus = true;
    if (selectedStatus === "completed") {
      matchStatus = todo.completed === true;
    } else if (selectedStatus === "notCompleted") {
      matchStatus = todo.completed === false;
    }
    return matchCategory && matchStatus;
  });

  // Bereken het aantal pagina's op basis van de gefilterde todo's.
  const totalPages = filteredTodos
    ? Math.ceil(filteredTodos.length / todosPerPage)
    : 0;

  // Als de huidige pagina groter is dan het aantal pagina's (bijv. na filtering), reset naar pagina 1.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredTodos?.length, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * todosPerPage;
  // Gebruik de paginatedTodos voor de rendering.
  const paginatedTodos = filteredTodos?.slice(
    startIndex,
    startIndex + todosPerPage,
  );

  return (
    <div>
      {/* Filtercomponent: hiermee kun je op categorie en status filteren */}
      <TodoFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {/* Todo-lijst met paginatie */}
      <div className="mt-4 flex flex-col gap-2">
        {paginatedTodos?.map((todo: Todo) => (
          <div key={todo.id} className="flex items-center">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo)}
            />
            <p className={`flex-1 ${todo.completed ? "line-through" : ""}`}>
              {todo.text}
            </p>
            <div className="ml-5 flex gap-2">
              {categories?.map((category: Category) =>
                category.id === todo.category ? (
                  <div key={category.id}>
                    <Badge
                      style={{ backgroundColor: category.color }}
                      variant="outline"
                    >
                      {category.name}
                    </Badge>
                  </div>
                ) : null,
              )}
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
            </div>
            <div>
              <X onClick={() => handleRemoveTodo(todo)} />
            </div>
          </div>
        ))}
      </div>

      {/* Select voor het instellen van het aantal todo's per pagina en pagination */}
      <div className="mt-4 flex justify-between">
        <div className="flex items-center gap-2">
          <p>Show:</p>
          <Select
            onValueChange={(value) => setTodosPerPage(Number(value))}
            value={String(todosPerPage)}
          >
            <SelectTrigger className="rounded border px-4 py-2">
              <SelectValue placeholder="Select todos per page">
                {todosPerPage} per page
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[5, 10, 15, 20].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} per page
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
