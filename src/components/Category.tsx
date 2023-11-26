import { useMutation } from "react-query";
import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

import type {
  DragableItem,
  Category,
  Task as ITask,
  DropPosition,
} from "~/protocols";
import { useModal } from "~/context/modal-context";
import { useAppContext } from "~/context/app-context";
import { deleteCategory } from "~/services/delete-category";

import { Task } from "./Task";
import { EditCategoryModal } from "./EditCategoryModal";
import { CreateTaskModal } from "./CreateTaskModal";
import { dragableTypes } from "~/constants/dragable-types";
import { useCallback } from "react";
import { findDragableIdToBeAfter } from "~/utils/drag";
import { reorderTask } from "~/services/reorder-task";

type Props = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  onTaskCreated: () => void;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
  onTaskReordered: () => void;
};

export function Category({
  category,
  onEdit,
  onDelete,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  onTaskReordered,
}: Props) {
  const { setModal } = useModal();
  const { api } = useAppContext();

  const [{ isDragging }, drag] = useDrag<
    DragableItem,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: dragableTypes.CATEGORY,
    item: { id: category.id, type: dragableTypes.CATEGORY },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const reorderMutation = useMutation(
    ({ taskId, beAfter }: { taskId: number; beAfter: number }) =>
      reorderTask({ beAfter, taskId, categoryId: category.id }, api),
  );

  const handleTaskDrop = useCallback(
    (
      taskId: number,
      tasks: ITask[] | undefined,
      dropPosition: DropPosition | null,
    ) => {
      if (!tasks || !dropPosition) return;

      const idToBeAfter = findDragableIdToBeAfter(
        tasks.map((t) => ({ id: t.id, type: dragableTypes.TASK })),
        dropPosition,
        dragableTypes.TASK,
      );

      let beAfter = 0;
      if (idToBeAfter) {
        beAfter = tasks.find((t) => t.id === idToBeAfter)?.position ?? 0;
      }

      console.log(`Reordering task ${taskId} to be after ${idToBeAfter}`);

      reorderMutation
        .mutateAsync({ beAfter, taskId })
        .then(onTaskReordered)
        .catch(() => {
          alert("Erro ao reordenar tarefa. Por favor tente novamente.");
        });
    },
    [category, category.tasks],
  );

  const [, drop] = useDrop<DragableItem, void, void>(
    () => ({
      accept: dragableTypes.TASK,
      drop: (item, monitor) => {
        const dropPosition = monitor.getClientOffset();
        handleTaskDrop(item.id, category.tasks, dropPosition);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [category.tasks],
  );

  const deleteMutation = useMutation(() =>
    deleteCategory({ categoryId: category.id }, api),
  );

  function handleAddTask() {
    setModal(
      <CreateTaskModal onTaskCreated={onTaskCreated} category={category} />,
    );
  }

  function handleDelete() {
    deleteMutation
      .mutateAsync()
      .then(() => {
        onDelete();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao deletar categoria. Por favor tente novamente.");
      })
      .finally(() => {
        setModal(null);
      });
  }

  return (
    <div
      ref={drag}
      className={`rounded bg-gray-700 p-4 ${isDragging && "opacity-60"}`}
      id={`category-${category.id}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex flex-row items-center justify-center font-sans text-xl font-bold text-white">
          <div className="cursor-pointer">
            <MdDragIndicator />
          </div>
          {category.name}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              setModal(
                <EditCategoryModal
                  onCategoryUpdated={onEdit}
                  category={category}
                />,
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
      </div>

      <ul ref={drop} className="space-y-2 p-4">
        {category.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </ul>
      <button
        onClick={handleAddTask}
        className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}
