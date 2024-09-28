interface taskCompletedProps {
  taskCompleted: number
  deleteAll: () => void
}

export function TaskListHeader({ taskCompleted, deleteAll }: taskCompletedProps) {
  return (
    <div className="flex gap-4 text-xl justify-start items-center font-bold text-zinc-100 ml-2 rounded-md">
      <div className="flex items-center justify-center bg-orange-500 rounded-md px-2">
        concluidas:
        <span>{taskCompleted}</span>
      </div>
      <div>
        <button className="flex gap-2 text-xl justify-center font-bold text-zinc-100 px-2 ml-2 bg-purple-800 rounded-md" onClick={deleteAll}>excluir tudo</button>
      </div>
    </div>
  )
}
