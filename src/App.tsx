import ThemeProvider from "@/components/providers/themeProvider";
import TodoList from "@/components/TodoList";
import Layout from "@/components/Layout";
import TodoForm from "@/components/TodoForm";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Toaster />
          <TodoForm />
          <TodoList />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default App;
