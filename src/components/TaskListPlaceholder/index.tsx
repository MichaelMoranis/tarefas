import { useTheme } from "../../contexts/ThemeContext";
import workout from "../../assets/workout.png";

export function TaskListPlaceholder() {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-4 justify-center w-full">
      <div className="flex flex-col justify-center text-center items-center gap-4">
        <img 
          src={workout} 
          alt="Lista de tarefas vazia" 
          className="w-28 h-28"
          style={{ filter: isDark ? "invert(0.8)" : "none" }}
        />
        <div className={`font-bold text-xl ${
          isDark ? "text-gray-200" : "text-gray-700"
        }`}>
          Você ainda não tem itens adicionados.
        </div>
        <div className={`font-bold text-xl ${
          isDark ? "text-purple-300" : "text-purple-600"
        }`}>
          Adicione novos itens !! 📝
        </div>
      </div>
    </div>
  );
}