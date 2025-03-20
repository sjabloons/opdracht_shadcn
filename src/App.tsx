import ThemeProvider from "@/components/providers/themeProvider";
import TodoList from "@/components/TodoList";
import Layout from "@/components/Layout";
import TodoForm from "@/components/TodoForm";
import TodoFilter from "@/components/TodoFilter";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
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
