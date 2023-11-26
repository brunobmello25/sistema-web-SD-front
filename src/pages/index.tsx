import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { useDrop } from "react-dnd";

import { Loading } from "~/components/Loading";
import { useAppContext } from "~/context/app-context";
import { loadCategories } from "~/services/load-categories";
import { Category } from "~/components/Category";
import { ModalContainer } from "~/components/ModalContainer";
import { useModal } from "~/context/modal-context";
import { AddCategoryModal } from "~/components/AddCategoryModal";
import { dragableTypes } from "~/constants/dragable-types";
import { reorderCategory } from "~/services/reorder-category";
import {
  type Category as ICategory,
  type DragableItem,
  type DropPosition,
} from "~/protocols";
import { useCallback } from "react";

export default function Home() {
  const {
    loading: userLoading,
    user,
    api,
    logout,
    loggedApiReady,
  } = useAppContext();
  const router = useRouter();
  const { setModal } = useModal();

  const reorderMutation = useMutation(
    ({ categoryId, beAfter }: { categoryId: number; beAfter: number }) =>
      reorderCategory({ beAfter, categoryId }, api),
  );

  const {
    refetch,
    data: categories,
    isLoading: apiLoading,
  } = useQuery("load-categories", () => loadCategories(api), {
    enabled: loggedApiReady,
  });

  const handleCategoryDrop = useCallback(
    (
      categoryId: number,
      categories: ICategory[] | undefined,
      dropPosition: DropPosition | null,
    ) => {
      if (!categories || !dropPosition) return;

      const idToBeAfter = findCategoryIdToBeAfter(categories, dropPosition);

      let beAfter = 0;
      if (idToBeAfter) {
        beAfter = categories.find((c) => c.id === idToBeAfter)?.position ?? 0;
      }

      reorderMutation
        .mutateAsync({ beAfter, categoryId })
        .then(() => refetch())
        .catch(() => {
          alert("Erro ao reordenar categoria. Por favor tente novamente.");
        });
    },
    [categories],
  );

  const [{ isOver }, drop] = useDrop<DragableItem, void, void>(
    () => ({
      accept: dragableTypes.CATEGORY,
      drop: (item, monitor) => {
        const dropPosition = monitor.getClientOffset();
        handleCategoryDrop(item.id, categories, dropPosition);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [categories],
  );

  if (userLoading || apiLoading) {
    return <Loading />;
  }

  if (!user) {
    void router.push("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Home - Lista de Tarefas SD</title>
        <meta
          name="description"
          content="Visualize e gerencie suas tarefas e categorias"
        />
      </Head>
      <main className="min-h-screen bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Suas tarefas</h1>
            <button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
              onClick={logout}
            >
              Sair
            </button>
          </div>

          <div ref={drop} className="space-y-6 p-4">
            {categories?.map((category) => (
              <Category
                onDelete={refetch}
                onEdit={refetch}
                key={category.id}
                category={category}
                onTaskCreated={refetch}
                onTaskUpdated={refetch}
                onTaskDeleted={refetch}
              />
            ))}
          </div>
          <button
            className="mt-6 w-full rounded bg-green-500 py-2 text-white hover:bg-green-600 focus:outline-none"
            onClick={() =>
              setModal(<AddCategoryModal onCategoryCreated={refetch} />)
            }
          >
            Adicionar Categoria
          </button>
        </div>
      </main>
      <ModalContainer />
    </>
  );
}

function findCategoryIdToBeAfter(
  categories: ICategory[],
  dropPosition: DropPosition,
): number | null {
  let nearestCategoryId = null;
  let minDistance = Infinity;

  categories.forEach((category) => {
    const categoryElement = document.getElementById(`category-${category.id}`);
    if (categoryElement) {
      const rect = categoryElement.getBoundingClientRect();
      const { distance, isBelow } = calculateDistanceToEdge(rect, dropPosition);
      if (distance < minDistance && isBelow) {
        minDistance = distance;
        nearestCategoryId = category.id;
      }
    }
  });

  return nearestCategoryId;
}

function calculateDistanceToEdge(
  rect: DOMRect,
  dropPosition: { x: number; y: number },
): { distance: number; isBelow: boolean } {
  const centerY = rect.top + rect.height / 2;
  const isBelow = dropPosition.y > centerY; // Check if the drop is below the midpoint

  const nearestEdge = isBelow ? rect.bottom : rect.top;
  const distance = Math.abs(nearestEdge - dropPosition.y);

  return { distance, isBelow };
}
