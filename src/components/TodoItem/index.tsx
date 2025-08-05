import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import bin from "../../assets/bin(1).png";
import iconedit from "../../assets/iconedit.svg";
import iconsave from "../../assets/iconsave.svg";

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
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = () => {
    if (editedValue.trim()) {
      onEdit(editedValue);
    }
    setIsEditing(false);
  };

  // Cores baseadas no tema e estado
  const getBackgroundColor = () => {
    if (isDragging) return "bg-orange-600";
    if (isChecked) return isDark ? "bg-purple-800" : "bg-purple-300";
    return isDark ? "bg-gray-700" : "bg-purple-400";
  };

  const getTextColor = () => {
    return isDark ? "text-white" : "text-white";
  };

  return (
    <div
      className={`flex items-center justify-between px-2 gap-y-4 w-full h-12 rounded-2xl font-bold transition-colors duration-200 ${getBackgroundColor()} ${getTextColor()} ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center">
        <input
          checked={isChecked}
          onChange={toggleCompletion}
          type="checkbox"
          className={`appearance-none w-6 h-6 border rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-2 ${
            isDark ? "border-gray-500 bg-gray-600" : "border-gray-300 bg-white"
          }`}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            className={`ms-2 rounded-full text-md font-medium px-2 ${
              isDark ? "bg-gray-600 text-white" : "bg-white text-black"
            }`}
          />
        ) : (
          <label className={`ms-2 rounded-full text-md font-medium ${getTextColor()}`}>
            {value}
          </label>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button 
            aria-label="save-item" 
            className="h-8"
            onClick={handleSave}
          >
            <img 
              src={iconsave} 
              className="h-8 w-8" 
              alt="Save"
              style={{ filter: isDark ? "invert(1)" : "none" }}
            />
          </button>
        ) : (
          <button 
            aria-label="edit-item" 
            className="h-8"
            onClick={handleEditClick}
          >
            <img 
              src={iconedit} 
              className="h-8 w-8" 
              alt="Edit"
              style={{ filter: isDark ? "invert(1)" : "none" }}
            />
          </button>
        )}
        <button 
          aria-label="delete-item" 
          className="h-8" 
          onClick={deleteItem}
        >
          <img 
            src={bin} 
            className="h-8 w-8" 
            alt="Delete"
            style={{ filter: isDark ? "invert(1)" : "none" }}
          />
        </button>
      </div>
    </div>
  );
}