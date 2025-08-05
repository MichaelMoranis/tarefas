import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import TodoItem from "../TodoItem";
import { TodoListProps } from "../../types";
import { TaskListPlaceholder } from "../TaskListPlaceholder";
import { TaskListHeader } from "../TasksListHeader";
import { useTheme } from "../../contexts/ThemeContext";

interface ListProps {
  valueItem: TodoListProps[];
  deleteItem: (id: number) => void;
  updateItems: (items: TodoListProps[]) => void;
  deleteAll: () => void;
}

export default function TodoList({
  valueItem,
  deleteItem,
  updateItems,
  deleteAll,
}: ListProps) {
  const { isDark } = useTheme();
  const taskCompleted = valueItem.filter((task) => task.isChecked);
  const totalTaskCompleted = taskCompleted.length;

  const toggleTaskCompletion = (id: number) => {
    const updatedItems = valueItem.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    updateItems(updatedItems);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...valueItem];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    updateItems(reordered);
  };

  const handleEditItem = (id: number, newText: string) => {
    const updatedItems = valueItem.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );
    updateItems(updatedItems);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {valueItem.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskListHeader 
            taskCompleted={totalTaskCompleted} 
            deleteAll={deleteAll} 
          />
          <Droppable droppableId="task-list">
            {(provided) => (
              <ul
                className={`flex flex-col rounded-md gap-2 w-full px-2 ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {valueItem.map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={
                          snapshot.isDragging 
                            ? isDark 
                              ? "bg-gray-700 rounded-lg shadow-lg" 
                              : "bg-purple-100 rounded-lg shadow-lg"
                            : ""
                        }
                      >
                        <TodoItem
                          value={task.text}
                          deleteItem={() => deleteItem(task.id)}
                          isChecked={task.isChecked}
                          toggleCompletion={() => toggleTaskCompletion(task.id)}
                          isDragging={snapshot.isDragging}
                          onEdit={(newValue) => handleEditItem(task.id, newValue)}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <TaskListPlaceholder />
      )}
    </div>
  );
}