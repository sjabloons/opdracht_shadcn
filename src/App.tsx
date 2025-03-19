import ThemeProvider from "@/components/providers/themeProvider";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import TodoForm from "@/components/TodoForm";
const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <TodoForm />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default App;
