import React, { useEffect, useRef, useState } from "react";
import TodoList from "./components/TodoList";
import { TodoListProps } from "./types";
import iconHeader from "./assets/task-list.png";
import iconPlus from "./assets/add.png";
import CurrentDate from "./components/Date";
import { ThemeToggle } from "./components/ThemeToggle/themeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<TodoListProps[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      } catch (e) {
        console.error("Falha ao analisar as tarefas do localStorage", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(valueItem));
    console.log("Tarefas salvas no localStorage:", valueItem);
  }, [valueItem]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

  function addInput(newText: string) {
    if (input.trim() != "") {
      setValueItem((prevValue: TodoListProps[]) => {
        const newInput: TodoListProps = {
          id: prevValue.length
            ? Math.max(...prevValue.map((item) => item.id)) + 1
            : 1,
          text: newText,
          isChecked: false,
        };
        return [...prevValue, newInput];
      });
      SetInput("");
      focusInput();
    }
  }

  function deleteItem(id: number) {
    const newListValue = valueItem.filter((value) => value.id !== id);
    setValueItem(newListValue);
  }

  function deleteAll() {
    setValueItem([]);
    localStorage.clear();
    console.log("tudo foi deletado");
  }

  const updateItems = (items: TodoListProps[]) => {
    setValueItem(items);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
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
                  <h1 className="text-zinc-200 dark:text-purple-200">Seus Itens:</h1>
                  <CurrentDate />
                  <ThemeToggle />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center bg-zinc-100 dark:bg-gray-700 p-2 rounded-tr-3xl rounded-tl-3xl gap-2">
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
                />
              </div>
              <button
                className="flex justify-around items-center font-semibold w-32 p-2 gap-2 text-center rounded-full bg-purple-800 dark:bg-gray-900 hover:bg-orange-500 dark:hover:bg-orange-600 transition-colors"
                type="button"
                aria-label="add"
                onClick={() => addInput(input)}
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
          <div className="flex flex-col w-full rounded-md my-4">
            <div className="placeholder:only:rounded-md">
              <TodoList
                valueItem={valueItem}
                deleteItem={deleteItem}
                deleteAll={deleteAll}
                updateItems={updateItems}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;