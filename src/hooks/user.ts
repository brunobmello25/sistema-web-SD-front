import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { type User } from "~/api/protocols";
import { createSession } from "~/api/services/sessions/create-session";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const mutation = useMutation(createSession);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }

    setLoading(false);
  }, []);

  async function login(username: string) {
    setLoading(true);

    try {
      const response = await mutation.mutateAsync(username);

      setUser(response);

      localStorage.setItem("user", JSON.stringify(response));
    } catch (err: unknown) {
      console.error(err);

      // TODO: tratar erros de forma mais adequada
      alert(
        "Erro ao fazer login, por favor recarregue a página e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return { loading, user, login };
}
