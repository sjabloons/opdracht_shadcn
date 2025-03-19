// Shadcn Components
import { Button } from "@/components/ui/button";

// Lucide
import { Moon, Sun } from "lucide-react";

// Provider
import { useTheme } from "@/components/providers/themeProvider";
const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <Button variant="outline" onClick={toggleTheme}>
        {theme === "dark" ? <Sun color="#f5f5f5" /> : <Moon color="#050505" />}
      </Button>
    </div>
  );
};
export default ToggleTheme;
