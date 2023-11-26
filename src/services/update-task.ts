import { type Axios } from "axios";
import { type Task } from "~/protocols";

interface Props {
  done: boolean;
  title: string;
  taskId: number;
}

export async function updateTask(
  { title, taskId, done }: Props,
  api: Axios,
): Promise<Task> {
  const { data } = await api.put<Task>(`/tasks/${taskId}`, {
    title,
    done,
  });

  return data;
}
