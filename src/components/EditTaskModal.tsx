import React, { useState } from "react";
import { useMutation } from "react-query";
import { useAppContext } from "~/context/app-context";
import { useModal } from "~/context/modal-context";
import { type Task } from "~/protocols";
import { updateTask } from "~/services/update-task";

type Props = {
  task: Task;
  onTaskUpdated: () => void;
};

export function EditTaskModal({ task, onTaskUpdated }: Props) {
  const { closeModal } = useModal();
  const [title, setTitle] = useState(task.title);
  const { api } = useAppContext();

  const mutation = useMutation(() =>
    updateTask({ taskId: task.id, done: task.done, title }, api),
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    mutation
      .mutateAsync()
      .then(() => {
        onTaskUpdated();
      })
      .catch(() => {
        alert("Erro ao editar task. Por favor tente novamente.");
      })
      .finally(() => {
        closeModal();
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="taskName"
        className="block text-sm font-medium text-white"
      >
        Novo nome da categoria
      </label>
      <input
        type="text"
        id="taskName"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button
        type="submit"
        className={`mt-6 w-full rounded bg-green-500 py-2 text-white hover:bg-green-600 focus:outline-none ${
          !title && "cursor-not-allowed opacity-50"
        }`}
        disabled={!title}
      >
        Adicionar
      </button>
    </form>
  );
}
