import { FaEdit, FaTrash } from "react-icons/fa";
import { type Category } from "~/protocols";
import { Task } from "./Task";
import { useModal } from "~/context/modal-context";
import { EditCategoryModal } from "./EditCategoryModal";

type Props = {
  category: Category;
  onEdit: () => void;
};

export function Category({ category, onEdit }: Props) {
  const { setModal } = useModal();

  return (
    <div className="rounded bg-gray-700 p-4">
      {/* Category Title */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-xl font-bold text-white">
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
          <button className="text-red-500 hover:text-red-600">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <ul className="space-y-2">
        {/* Example Task */}
        {category.tasks.map((task) => (
          <Task key={task.id} title={task.title} />
        ))}
      </ul>
      {/* Add Task Button */}
      <button className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none">
        Adicionar Tarefa
      </button>
    </div>
  );
}
