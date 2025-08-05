import React, { useEffect, useRef, useState } from "react";
import TodoList from "./components/TodoList";
import { TodoList as TodoListType, TodoItem } from "./types";
import iconHeader from "./assets/task-list.png";
import iconPlus from "./assets/add.png";
import CurrentDate from "./components/Date";
import { ThemeToggle } from "./components/ThemeToggle/themeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ListSelector } from "./components/ListSelector/ListSelector";

function App() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState<TodoListType[]>(() => {
    const storedLists = localStorage.getItem("todoLists");
    return storedLists
      ? JSON.parse(storedLists).map(
          (list: { createdAt: string } & Omit<TodoListType, "createdAt">) => ({
            ...list,
            createdAt: new Date(list.createdAt),
          })
        )
      : [
          {
            id: Date.now(),
            title: "Minha Lista",
            items: [],
            createdAt: new Date(),
          },
        ];
  });

  const [activeListId, setActiveListId] = useState<number>(lists[0]?.id);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persistência no localStorage
  useEffect(() => {
    const listsToStore = lists.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(), // Converte Date para string
    }));
    localStorage.setItem("todoLists", JSON.stringify(listsToStore));

    if (lists.length > 0 && !lists.some((list) => list.id === activeListId)) {
      setActiveListId(lists[0].id);
    }
  }, [lists, activeListId]);

  const activeList = lists.find((list) => list.id === activeListId) || lists[0];

  // ========== FUNÇÕES PARA TAREFAS ==========
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTask = (text: string) => {
    if (!text.trim()) return;

    const newTask: TodoItem = {
      id: Date.now(),
      text,
      isChecked: false,
    };

    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? { ...list, items: [...list.items, newTask] }
          : list
      )
    );
    setInput("");
  };

  const deleteTask = (id: number) => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.filter((item) => item.id !== id) }
          : list
      )
    );
  };

  const deleteAllTasks = () => {
    // if (window.confirm("Tem certeza que deseja apagar todas as tarefas desta lista?")) {
    setLists(
      lists.map((list) =>
        list.id === activeListId ? { ...list, items: [] } : list
      )
    );
    // }
  };

  const updateTasks = (items: TodoItem[]) => {
    setLists(
      lists.map((list) =>
        list.id === activeListId ? { ...list, items } : list
      )
    );
  };

  const toggleTaskCompletion = (id: number) => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
              ),
            }
          : list
      )
    );
  };

  // ========== FUNÇÕES PARA LISTAS ==========
  const createNewList = (title: string) => {
    const newList: TodoListType = {
      id: Date.now(),
      title: title || `Lista ${lists.length + 1}`,
      items: [],
      createdAt: new Date(),
    };
    setLists([...lists, newList]);
    setActiveListId(newList.id);
  };

  const deleteList = (id: number) => {
    // Remove a lista sem verificar nada
    const newLists = lists.filter((list) => list.id !== id);
    setLists(newLists);

    // Se deletou a lista ativa, muda para a primeira disponível
    if (id === activeListId && newLists.length > 0) {
      setActiveListId(newLists[0].id);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          {/* Header */}
          <div className="w-full text-zinc-300 bg-purple-800 dark:bg-gray-900">
            <div className="flex flex-col m-4 gap-2">
              <div className="flex justify-between flex-row-reverse items-center gap-4 font-bold text-2xl">
                <div>
                  <img
                    className="h-16 w-16"
                    src={iconHeader}
                    alt="lista icone"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
                <div>
                  <CurrentDate />
                  <ThemeToggle />
                </div>
              </div>
              <h1 className="text-zinc-200 text-2xl dark:text-purple-200">
                {activeList?.title || "Seus Itens"}
              </h1>
            </div>

            {/* ListSelector - Controle de listas */}
            <ListSelector
              lists={lists}
              activeListId={activeListId}
              onSelect={setActiveListId}
              onCreate={createNewList}
              onDelete={deleteList}
            />

            {/* Input para novas tarefas */}
            <div className="flex items-center bg-zinc-100 dark:bg-gray-700 p-2 rounded-tr-3xl rounded-tl-3xl gap-2">
              <div className="flex gap-32 w-full bg-zinc-200 dark:bg-gray-600 text-black dark:text-white rounded-full gap-x-4">
                <input
                  className="text-black dark:text-white text-center p-2 mx-4 bg-zinc-200 dark:bg-gray-600 w-full rounded-full font-bold placeholder-zinc-500 dark:placeholder-gray-400 outline-none"
                  type="text"
                  name="myInput"
                  id="item"
                  value={input}
                  onChange={handleInput}
                  ref={inputRef}
                  placeholder="inserir itens"
                  onKeyPress={(e) => e.key === "Enter" && addTask(input)}
                />
              </div>
              <button
                className="flex justify-around items-center font-semibold w-32 p-2 gap-2 text-center rounded-full bg-purple-800 dark:bg-gray-900 hover:bg-orange-500 dark:hover:bg-orange-600 transition-colors"
                type="button"
                aria-label="add"
                onClick={() => addTask(input)}
              >
                <p className="text-xl text-white">criar</p>
                <div className="w-6 h-6">
                  <img
                    src={iconPlus}
                    alt="Adicionar"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Lista de tarefas */}
          <div className="flex flex-col w-full rounded-md my-4">
            {activeList ? (
              <TodoList
                valueItem={activeList.items}
                deleteItem={deleteTask}
                deleteAll={deleteAllTasks}
                updateItems={updateTasks}
                toggleCompletion={toggleTaskCompletion}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhuma lista disponível
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
