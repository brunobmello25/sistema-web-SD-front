import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Loading } from "~/components/Loading";
import { useAppContext } from "~/context/app-context";
import { loadCategories } from "~/services/load-categories";
import { Category } from "~/components/Category";
import { ModalContainer } from "~/components/ModalContainer";
import { useModal } from "~/context/modal-context";
import { AddCategoryModal } from "~/components/AddCategoryModal";

export default function Home() {
  const { loading: userLoading, user, api, loggedApiReady } = useAppContext();
  const router = useRouter();
  const { setModal } = useModal();

  const {
    refetch,
    data: categories,
    isLoading: apiLoading,
  } = useQuery("load-categories", () => loadCategories(api), {
    enabled: loggedApiReady,
  });

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
          <div className="space-y-6">
            {categories?.map((category) => (
              <Category
                onDelete={refetch}
                onEdit={refetch}
                key={category.id}
                category={category}
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
