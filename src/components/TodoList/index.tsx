import TodoItem from "../TodoItem";
import { TodoListProps } from "../../types";
import { TaskListPlaceholder } from "../TaskListPlaceholder";
import { TaskListHeader } from "../TasksListHeader";

interface ListProps {
  valueItem: TodoListProps[];
  deleteItem: (id: number) => void;
  updateItems: (items: TodoListProps[]) => void;
  deleteAll: () => void
}

export default function TodoList({
  valueItem,
  deleteItem,
  updateItems,
  deleteAll,
}: ListProps) {


  const taskCompleted = valueItem.filter((task) => task.isChecked);
  const totalTaskCompleted = taskCompleted.length;

  const toggleTaskCompletion = (id: number) => {
    const updatedItems = valueItem.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    updateItems(updatedItems);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {valueItem.length > 0 ? (
        <ul className="flex flex-col rounded-md gap-2 text-white w-full px-2">
          <TaskListHeader taskCompleted={totalTaskCompleted} deleteAll={deleteAll} />
          {valueItem.map((value) => (
            <TodoItem
              key={value.id}
              value={value.text}
              deleteItem={() => deleteItem(value.id)}
              isChecked={value.isChecked}
              toggleCompletion={() => toggleTaskCompletion(value.id)}
            />
          ))}
        </ul>
      ) : (
        <TaskListPlaceholder />
      )}
    </div>
  );
}
