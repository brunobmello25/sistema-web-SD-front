import { useMutation } from "react-query";
import { useDrag } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

import { type DragableItem, type Category } from "~/protocols";
import { useModal } from "~/context/modal-context";
import { useAppContext } from "~/context/app-context";
import { deleteCategory } from "~/services/delete-category";

import { Task } from "./Task";
import { EditCategoryModal } from "./EditCategoryModal";
import { CreateTaskModal } from "./CreateTaskModal";
import { dragableTypes } from "~/constants/dragable-types";

type Props = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  onTaskCreated: () => void;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
};

export function Category({
  category,
  onEdit,
  onDelete,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}: Props) {
  const { setModal } = useModal();
  const { api } = useAppContext();

  const [{ isDragging }, drag, preview] = useDrag<
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
      ref={preview}
      className={`rounded bg-gray-700 p-4 ${isDragging && "opacity-60"}`}
      id={`category-${category.id}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex flex-row items-center justify-center font-sans text-xl font-bold text-white">
          <div className="cursor-pointer" ref={drag}>
            <MdDragIndicator />
          </div>
          {category.id} - {category.name}
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

      <ul className="space-y-2">
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
