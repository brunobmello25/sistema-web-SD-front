import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Loading } from "~/components/Loading";
import { useAppContext } from "~/context/app-context";
import { loadCategories } from "~/services/load-categories";
import { Category } from "~/components/Category";

export default function Home() {
  const { loading: userLoading, user, api } = useAppContext();
  const router = useRouter();

  const { data: categories, isFetching } = useQuery(
    "load-categories",
    () => loadCategories(api),
    {
      enabled: !userLoading && !!user,
    },
  );

  if (userLoading || isFetching) {
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
          {/* Categories List */}
          <div className="space-y-6">
            {/* Example Category */}
            {categories?.map((category) => (
              <Category key={category.id} category={category} />
            ))}

            {/* Add more categories here */}
          </div>
          {/* Add Category Button */}
          <button
            className="mt-6 w-full rounded bg-green-500 py-2 text-white hover:bg-green-600 focus:outline-none"
            onClick={() => {}} // Replace with function to add new category
          >
            Adicionar Categoria
          </button>
        </div>
      </main>
    </>
  );
}
