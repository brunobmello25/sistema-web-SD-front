import { FaEdit, FaTrash } from "react-icons/fa";
import { type Category } from "~/protocols";
import { Task } from "./Task";

type Props = {
  category: Category;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddTask?: () => void;
  onTaskEdit?: () => void;
  onTaskDelete?: () => void;
  onTaskComplete?: () => void;
};

export function Category({
  category,
  onTaskEdit,
  onTaskDelete,
  onTaskComplete,
  onEdit,
  onDelete,
  onAddTask,
}: Props) {
  return (
    <div className="rounded bg-gray-700 p-4">
      {/* Category Title */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-xl font-bold text-white">
          {category.name}
        </span>
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={onEdit}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={onDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <ul className="space-y-2">
        {/* Example Task */}
        {category.tasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
            onComplete={onTaskComplete}
          />
        ))}
      </ul>
      {/* Add Task Button */}
      <button
        className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
        onClick={onAddTask} // Replace with function to add new task
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}
