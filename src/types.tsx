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

export type TodoFilterProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
