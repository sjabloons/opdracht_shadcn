import {
  useGetTodosQuery,
  useToggleTodoMutation,
  useRemoveTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "@/store/todoApi";
import { useGetCategoriesQuery } from "@/store/categorieApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import TodoFilter from "@/components/TodoFilter";
import { Category, Todo } from "@/types";
import { toast } from "sonner";
import { ChevronDown, Pen, Pencil, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
const TodoList = () => {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [toggleTodo] = useToggleTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState<number>(() => {
    const totalPerPage = localStorage.getItem("totalPerPage");
    return totalPerPage ? parseInt(totalPerPage) : 5;
  });
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");

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

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      await updateTodo({
        id: todo.id,
        completed: todo.completed,
        text: todoTitle,
        category: todo.category,
        description: todoDescription,
      }).unwrap();
      toast.success("Todo updated");
    } catch (error) {
      return toast.error("Error updating todo");
    }
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
    <div className="mt-4">
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
          <div
            key={todo.id}
            className={`flex items-center rounded-lg border p-4 ${todo.completed ? "bg-black" : ""}`}
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo)}
            />
            <p
              className={`flex-1 ${todo.completed ? "text-gray-400 line-through" : ""} `}
            >
              {todo.text}
            </p>
            <div className="flex items-center gap-10">
              <div className="ml-5 flex gap-2">
                {categories?.map((category: Category) =>
                  category.id === todo.category ? (
                    <div key={category.id} className="block">
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

              <Collapsible
                open={isOpen[todo.id] || false}
                onOpenChange={(open) =>
                  setIsOpen((prev) => ({ ...prev, [todo.id]: open }))
                }
                className="w-[350px] space-y-2"
              >
                <div className="flex items-center justify-between space-x-4 px-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                    {todo.description}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div>
                <Dialog>
                  {/* De DialogTrigger wikkelt de icoon in een knop zodat bij klikken de dialog opent */}
                  <DialogTrigger asChild>
                    <button className="rounded-full p-2">
                      <Pencil />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>ChangeTodo</DialogTitle>
                    <DialogDescription>
                      <Label htmlFor="todoTitle">Title</Label>
                      <Input
                        id="todoTitle"
                        type="text"
                        placeholder={todo.text}
                        onChange={(e) => setTodoTitle(e.target.value)}
                      />

                      <Label htmlFor="todoDescription">Description:</Label>
                      <Input
                        id="todoDescription"
                        type="text"
                        placeholder={todo.description}
                        onChange={(e) => setTodoDescription(e.target.value)}
                      />
                    </DialogDescription>

                    <Button onClick={() => handleUpdateTodo(todo)}>
                      Update
                    </Button>
                    <DialogClose asChild>
                      <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
                        Sluiten
                      </button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
              <div className={`${todo.completed ? "text-gray-400" : ""}`}>
                <X onClick={() => handleRemoveTodo(todo)} />
              </div>
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
