import { FaEdit, FaTrash } from "react-icons/fa";
import { useModal } from "~/context/modal-context";
import { EditTaskModal } from "./EditTaskModal";
import { type DragableItem, type Task } from "~/protocols";
import { useState } from "react";
import { useMutation } from "react-query";
import { updateTask } from "~/services/update-task";
import { useAppContext } from "~/context/app-context";
import { deleteTask } from "~/services/delete-task";
import { MdDragIndicator } from "react-icons/md";
import { useDrag } from "react-dnd";
import { dragableTypes } from "~/constants/dragable-types";

type Props = {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
};

export function Task({ onTaskUpdated, onTaskDeleted, task }: Props) {
  const { setModal } = useModal();
  const { api } = useAppContext();
  const [checked, setChecked] = useState(task.done);

  const [{ isDragging }, drag] = useDrag<
    DragableItem,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: dragableTypes.TASK,
    item: { id: task.id, type: dragableTypes.TASK },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const updateCheckedMutation = useMutation((checked: boolean) =>
    updateTask({ done: checked, title: task.title, taskId: task.id }, api),
  );

  const deleteMutation = useMutation(() =>
    deleteTask({ taskId: task.id }, api),
  );

  function handleDelete() {
    deleteMutation
      .mutateAsync()
      .then(() => {
        onTaskDeleted();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao deletar tarefa. Por favor tente novamente.");
      })
      .finally(() => {
        setModal(null);
      });
  }

  function handleOnCheck() {
    const originalStatus = task.done;

    setChecked(!originalStatus);

    updateCheckedMutation
      .mutateAsync(!originalStatus)
      .then(() => {
        onTaskUpdated();
      })
      .catch(() => {
        alert("Erro ao atualizar tarefa. Por favor tente novamente.");
        setChecked(originalStatus);
      });
  }

  return (
    <li
      ref={drag}
      className={`flex items-center justify-between rounded bg-gray-600 p-2 ${
        isDragging && "opacity-60"
      }`}
      id={`task-${task.id}`}
    >
      <div className="cursor-pointer text-white">
        <MdDragIndicator />
      </div>

      <input
        type="checkbox"
        className="mr-2 h-4 w-4"
        checked={checked}
        onChange={handleOnCheck}
      />

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
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
