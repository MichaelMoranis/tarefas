// contexts/ListsContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';
import { TodoListType } from '../types';

interface ListsContextType {
  lists: TodoListType[];
  activeListId: number | null;
  setLists: (lists: TodoListType[]) => void;
  setActiveListId: (id: number) => void;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export function ListProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<TodoListType[]>([]);
  const [activeListId, setActiveListId] = useState<number | null>(null);

  return (
    <ListsContext.Provider value={{ lists, activeListId, setLists, setActiveListId }}>
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);
  if (!context) throw new Error('useLists must be used within a ListsProvider');
  return context;
}