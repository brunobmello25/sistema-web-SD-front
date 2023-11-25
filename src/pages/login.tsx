import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loading } from "~/components/Loading";
import { useUser } from "~/hooks/user";

export default function Login() {
  const { login, loading, username } = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  if (loading) {
    return <Loading />;
  }

  if (username) {
    void router.push("/");
    return null;
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\W/g, "");
    setInputValue(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submit", inputValue);
    await login(inputValue);
  }

  const buttonEnabled = inputValue.length > 0;

  return (
    <>
      <Head>
        <title>Login - Lista de Tarefas SD</title>
        <meta
          name="description"
          content="Gerencie suas listas de tarefas de formas simples"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 p-2">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h1 className="mb-6 font-mono text-3xl text-gray-300">
            Por favor, digite seu usuário
          </h1>

          <input
            type="text"
            placeholder="Usuário"
            className="rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            disabled={!buttonEnabled}
            className={`rounded bg-blue-500 px-4 py-2 font-mono text-xl text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              buttonEnabled ? "" : "cursor-not-allowed opacity-50"
            }`}
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  );
}
