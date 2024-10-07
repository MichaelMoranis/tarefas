import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoListProps } from "./types";
import { useRef } from "react";

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
  // aqui estou atualizando o localstorage sempre que "valueItem no [array] mudar"
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(valueItem));
    console.log("Tarefas salvas no localStorage:", valueItem);
  }, [valueItem]);

  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

  // funcao para adicionar elementos na lista
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
      handleInputRef();
    }
  }

  // funcao para deletar itens na lista
  function deleteItem(id: number) {
    const newListValue = valueItem.filter((value) => value.id !== id);
    setValueItem(newListValue);
  }

  function deleteAll() {
    setValueItem([]);
    localStorage.clear();
    console.log("tudo foi deletado");
  }

  // funcao para atualizar o novo array de efeito do drag and drop
  const updateItems = (items: TodoListProps[]) => {
    setValueItem(items);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleInputRef() {
    if (input.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <Header
          input={input}
          inputRef={inputRef}
          handleInput={handleInput}
          addInput={addInput}
        />
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
  );
}

export default App;
