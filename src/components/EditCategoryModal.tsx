import React, { useState } from "react";
import { useMutation } from "react-query";
import { useAppContext } from "~/context/app-context";
import { useModal } from "~/context/modal-context";
import { type Category } from "~/protocols";
import { updateCategory } from "~/services/update-category";

type Props = {
  category: Category;
  onCategoryUpdated: () => void;
};

export function EditCategoryModal({ category, onCategoryUpdated }: Props) {
  const { closeModal } = useModal();
  const [categoryName, setCategoryName] = useState(category.name);
  const { api } = useAppContext();

  const mutation = useMutation(() =>
    updateCategory({ name: categoryName, categoryId: category.id }, api),
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    mutation
      .mutateAsync()
      .then(() => {
        onCategoryUpdated();
      })
      .catch(() => {
        alert("Erro ao editar categoria. Por favor tente novamente.");
      })
      .finally(() => {
        closeModal();
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="categoryName"
        className="block text-sm font-medium text-white"
      >
        Novo nome da categoria
      </label>
      <input
        type="text"
        id="categoryName"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        required
        value={categoryName}
        onChange={(event) => setCategoryName(event.target.value)}
      />
      <button
        type="submit"
        className={`mt-6 w-full rounded bg-green-500 py-2 text-white hover:bg-green-600 focus:outline-none ${
          !categoryName && "cursor-not-allowed opacity-50"
        }`}
        disabled={!categoryName}
      >
        Adicionar
      </button>
    </form>
  );
}
