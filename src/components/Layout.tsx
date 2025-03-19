import ToggleTheme from "@/components/ToggleTheme";
import Stats from "@/components/Stats";
import { LayoutProps } from "@/types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <ToggleTheme />
      </div>
      <div>{children}</div>
      <hr />
      <Stats />
    </div>
  );
};
export default Layout;
