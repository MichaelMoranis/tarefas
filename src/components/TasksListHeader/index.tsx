import { useTheme } from "../../contexts/ThemeContext";

interface taskCompletedProps {
  taskCompleted: number;
  deleteAll: () => void;
}

export function TaskListHeader({ taskCompleted, deleteAll }: taskCompletedProps) {
  const { isDark } = useTheme();

  return (
    <div className={`flex gap-4 text-xl justify-start items-center font-bold ${
      isDark ? "text-gray-200" : "text-gray-800"
    } ml-2 rounded-md`}>
      <div className={`flex items-center justify-center rounded-md px-2 ${
        isDark ? "bg-gray-600" : "bg-orange-500"
      }`}>
        Concluídas:
        <span className="ml-1">{taskCompleted}</span>
      </div>
      <div>
        <button 
          onClick={deleteAll}
          className={`flex gap-2 text-xl justify-center font-bold px-2 ml-2 rounded-md transition-colors ${
            isDark 
              ? "bg-gray-600 text-purple-100 hover:bg-orange-800" 
              : "bg-purple-800 text-zinc-100 hover:bg-purple-700"
          }`}
        >
          Excluir tudo
        </button>
      </div>
    </div>
  );
}