interface taskCompletedProps {
  taskCompleted: number
}

export function TaskListHeader({ taskCompleted }: taskCompletedProps) {
  return (
    <div className="flex gap-2 text-xl  justify-center font-bold text-zinc-800 px-2 ml-2 bg-orange-400 rounded-md w-48">
      concluidas:
      <span>{taskCompleted}</span>
    </div>
  )
}
