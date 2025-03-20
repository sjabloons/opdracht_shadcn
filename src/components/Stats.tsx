import { useGetTodosQuery } from "@/store/todoApi";
const Stats = () => {
  const { data: todos } = useGetTodosQuery();
  return (
    <>
      <div className="flex justify-between">
        <p>total: {todos?.length}</p>
        <p>active: {todos?.filter((todo) => !todo.completed).length}</p>
        <p>completed: {todos?.filter((todo) => todo.completed).length}</p>
        <p>
          {todos?.length
            ? Math.round(
                (todos?.filter((todo) => todo.completed).length /
                  todos?.length) *
                  100,
              )
            : 0}
          % completed
        </p>
      </div>
    </>
  );
};
export default Stats;
