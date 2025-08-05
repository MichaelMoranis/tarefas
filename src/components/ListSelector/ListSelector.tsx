import { useState } from "react";
import { TodoListType } from "../../types";

interface ListSelectorProps {
  lists: TodoListType[];
  activeListId: number;
  onSelect: (id: number) => void;
  onCreate: (title: string) => void;
  onDelete: (id: number) => void;
}

export function ListSelector({
  lists,
  activeListId,
  onSelect,
  onCreate,
  onDelete,
}: ListSelectorProps) {
  const [newListName, setNewListName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDeleteClick = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete(id); // Assume que onDelete pode ser assíncrono
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreate(newListName);
      setNewListName("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-2 rounded-md w-full bg-purple-800 dark:bg-gray-800 border-b border-purple-900 dark:border-gray-700 p-2">
      {/* Listas existentes - Scroll horizontal */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar">
        <div className="flex gap-2 min-w-max py-1">
          {lists.map((list) => (
            <div
              key={list.id}
              className="flex items-center gap-1 group relative"
              data-testid={`list-item-${list.id}`}
            >
              <button
                onClick={() => onSelect(list.id)}
                disabled={isDeleting}
                className={`min-w-max px-4 py-2 h-10 rounded-full text-md font-bold transition-all duration-200 ${
                  activeListId === list.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-purple-700 dark:bg-gray-700 text-purple-100 hover:bg-purple-600 dark:hover:bg-gray-600"
                } ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {list.title}
              </button>

              {lists.length > 1 && (
                <button
                  onClick={(e) => handleDeleteClick(e, list.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-red-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 transition-all"
                  title={`Deletar lista "${list.title}"`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Criar nova lista */}
      <div className="flex items-center bg-purple-700 dark:bg-gray-700 rounded-full h-10 p-2">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCreateList()}
          placeholder="Nova lista"
          className="bg-transparent text-purple-50 dark:text-gray-100 placeholder-purple-300 dark:placeholder-gray-400 text-sm font-medium w-32 focus:outline-none"
          disabled={isDeleting}
          aria-label="Nome da nova lista"
        />
        <button
          onClick={handleCreateList}
          disabled={!newListName.trim() || isDeleting}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
            newListName.trim() && !isDeleting
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-purple-600 dark:bg-gray-600 text-purple-300 dark:text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Criar nova lista"
        >
          <span className="text-lg leading-none">+</span>
        </button>
      </div>
    </div>
  );
}
