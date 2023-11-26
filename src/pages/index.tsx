import Head from "next/head";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";

import { Loading } from "~/components/Loading";
import { useAppContext } from "~/context/app-context";

export default function Home() {
  const { loading, user } = useAppContext();
  const router = useRouter();

  if (loading) {
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
            <div className="rounded bg-gray-700 p-4">
              {/* Category Title */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-sans text-xl font-bold text-white">
                  Categoria Exemplo
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => {}} // Replace with function to open edit category modal
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {}} // Replace with function to delete category
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              {/* Tasks List */}
              <ul className="space-y-2">
                {/* Example Task */}
                <li className="flex items-center justify-between rounded bg-gray-600 p-2">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    onChange={() => {}} // Replace with function to toggle task completion
                  />

                  <span className="flex-grow text-white">Tarefa Exemplo</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => {}} // Replace with function to open edit task modal
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {}} // Replace with function to delete task
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
                {/* Add more tasks here */}
              </ul>
              {/* Add Task Button */}
              <button
                className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
                onClick={() => {}} // Replace with function to add new task
              >
                Adicionar Tarefa
              </button>
            </div>
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
