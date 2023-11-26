import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
};

export function Task({ title, onComplete, onDelete, onEdit }: Props) {
  return (
    <li className="flex items-center justify-between rounded bg-gray-600 p-2">
      <input
        type="checkbox"
        className="mr-2 h-4 w-4"
        onChange={onComplete} // Replace with function to toggle task completion
      />

      <span className="flex-grow text-white">{title}</span>
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={onEdit} // Replace with function to open edit task modal
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={onDelete} // Replace with function to delete task
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
