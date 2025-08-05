export interface TodoListProps {
  id: number;
  text: string;
  isChecked: boolean;
  toggleCompletion: (id: number) => void; 
}

export interface HeaderProps {
  input: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addInput: (newText: string) => void;
}


export interface TodoList {
  id: number;
  title: string;
  items: TodoItem[];
  createdAt: Date;
}

export interface TodoItem {
  id: number;
  text: string;
  isChecked: boolean;
}

export interface TodoListType {
  id: number;
  title: string;
  items: TodoItem[];
  createdAt: Date;
}
