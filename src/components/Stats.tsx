import { useGetTodosQuery } from "@/store/todoApi";
const Stats = () => {
  const { data: todos } = useGetTodosQuery();
  return (
    <>
      <div className="mt-4 flex justify-between">
        <p>Total: {todos?.length}</p>
        <p>Active: {todos?.filter((todo) => !todo.completed).length}</p>
        <p>Completed: {todos?.filter((todo) => todo.completed).length}</p>
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
