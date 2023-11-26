import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios, { type Axios } from "axios";
import { env } from "~/env";
import { type User } from "~/protocols";
import { useMutation } from "react-query";

interface ApiContextType {
  api: Axios;
  user: User | null;
  login: (username: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<ApiContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setLoading(false);
  }, []);

  const mutation = useMutation(async (username: string) => {
    const { data } = await api.post<User>("/sessions", { username });

    return {
      id: data.id,
      username: data.username,
    };
  });

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

  return (
    <AppContext.Provider value={{ user, api, login, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
