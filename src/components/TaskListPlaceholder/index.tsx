import workout from "../../assets/workout.png";

export function TaskListPlaceholder() {
  return (
    <div className="flex gap-4 justify-center w-full">
      <div className="flex flex-col justify-center text-center items-center gap-4">
        <img src={workout} alt="Lista de tarefas vazia" className="w-28 h-28" />
        <div className="font-bold text-xl">
          Você ainda não tem itens cadastrados.
        </div>
        <div className="font-bold text-xl">cadastre novos itens !! 📝</div>
      </div>
    </div>
  );
}
