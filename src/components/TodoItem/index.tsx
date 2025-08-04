import { useState } from "react";
import bin from "../../assets/bin(1).png";
import iconedit from "../../assets/iconedit.svg"; // Adicione este ícone na sua pasta assets

interface TodoItemProps {
  value: string;
  deleteItem: () => void;
  isChecked: boolean;
  toggleCompletion: () => void;
  isDragging?: boolean;
  onEdit: (newValue: string) => void;
}

export default function TodoItem({
  value,
  deleteItem,
  isChecked,
  toggleCompletion,
  isDragging = false,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedValue.trim()) {
      onEdit(editedValue);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center justify-between px-2 gap-y-4 w-full h-12 rounded-2xl font-bold transition-colors duration-200 ${
        isDragging
          ? "bg-orange-600 shadow-lg"
          : isChecked
          ? "text-white bg-purple-300"
          : "text-white bg-purple-400"
      }`}
    >
      <div className="flex items-center">
        <input
          checked={isChecked}
          onChange={toggleCompletion}
          type="checkbox"
          className="appearance-none w-6 h-6 border bg-white border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onBlur={handleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            className="ms-2 rounded-full text-md font-medium bg-white text-black px-2"
          />
        ) : (
          <label className="ms-2 rounded-full text-md font-medium">
            {value}
          </label>
        )}
      </div>
      <div className="flex gap-2">
        <button 
          aria-label="edit-item" 
          className="h-8"
          onClick={handleEditClick}
        >
          <img src={iconedit} className="h-8 w-8" alt="Edit" />
        </button>
        <button 
          aria-label="delete-item" 
          className="h-8" 
          onClick={deleteItem}
        >
          <img src={bin} className="h-8 w-8" alt="Delete" />
        </button>
      </div>
    </div>
  );
}