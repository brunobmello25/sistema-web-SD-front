import { type Axios } from "axios";
import { type Task } from "~/protocols";

interface Props {
  title: string;
  categoryId: number;
}

export async function createTask(
  { title, categoryId }: Props,
  api: Axios,
): Promise<Task> {
  const { data } = await api.post<Task>("/tasks", {
    title,
    categoryId,
  });

  return data;
}
