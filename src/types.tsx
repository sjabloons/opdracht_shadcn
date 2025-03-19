export type LayoutProps = {
  children: React.ReactNode;
};

export type Todo = {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  category: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
};
