import bin from "../../assets/bin(1).png";

interface TodoItemProps {
  value: string;
  deleteItem: () => void;
  isChecked: boolean;
  toggleCompletion: () => void;
}

export default function TodoItem({
  value,
  deleteItem,
  isChecked,
  toggleCompletion,
}: TodoItemProps) {
  return (
    <li
      className={`flex items-center justify-between px-2 gap-y-4 w-full h-12 rounded-2xl font-bold ${isChecked ? "text-white bg-purple-300 " : "text-white bg-purple-400"
        }`}
      draggable
    >
      <div className="flex items-center">
        <input
          checked={isChecked}
          onChange={toggleCompletion}
          id="checked-checkbox"
          type="checkbox"
          className="appearance-none w-6 h-6 border bg-white border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-2"
        />
        <label
          htmlFor="checked-checkbox"
          className="ms-2 rounded-full text-md font-medium"
        >
          {value}
        </label>
      </div>
      <button aria-label="delete-item" className="h-8" onClick={deleteItem}>
        <img src={bin} className="h-8 w-8" alt="Delete" />
      </button>
    </li>
  );
}
