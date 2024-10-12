export interface TodoListProps {
  id: number;
  text: string;
  isChecked: boolean;
}

export interface HeaderProps {
  input: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addInput: (newText: string) => void;
}
