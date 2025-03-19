import ThemeProvider from "@/components/providers/themeProvider";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>test</Layout>
      </ThemeProvider>
    </div>
  );
};
export default App;
