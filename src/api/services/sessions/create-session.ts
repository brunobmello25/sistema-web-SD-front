import axiosClient from "~/api/axiosClient";
import { type User } from "~/api/protocols";

export async function createSession(username: string): Promise<User> {
  const { data } = await axiosClient.post<User>("/sessions", { username });

  return {
    id: data.id,
    username: data.username,
  };
}
