import { FaEdit, FaTrash } from "react-icons/fa";
import { useModal } from "~/context/modal-context";
import { EditTaskModal } from "./EditTaskModal";
import { type Task } from "~/protocols";

type Props = {
  task: Task;
  onTaskUpdated: () => void;
};

export function Task({ onTaskUpdated, task }: Props) {
  const { setModal } = useModal();

  return (
    <li className="flex items-center justify-between rounded bg-gray-600 p-2">
      <input type="checkbox" className="mr-2 h-4 w-4" />

      <span className="flex-grow text-white">{task.title}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() =>
            setModal(
              <EditTaskModal onTaskUpdated={onTaskUpdated} task={task} />,
            )
          }
          className="text-blue-500 hover:text-blue-600"
        >
          <FaEdit />
        </button>
        <button className="text-red-500 hover:text-red-600">
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
