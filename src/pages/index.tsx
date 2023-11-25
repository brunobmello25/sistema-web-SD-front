import Head from "next/head";
import { useRouter } from "next/router";
import { Loading } from "~/components/Loading";
import { useUser } from "~/hooks/user";

export default function Home() {
  const { loading, username } = useUser();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (!username) {
    void router.push("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Lista de Tarefas SD</title>
        <meta
          name="description"
          content="Gerencie suas listas de tarefas de formas simples"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Logado</h1>
      </main>
    </>
  );
}
