import { type Axios } from "axios";
import { type Task } from "~/protocols";

interface Props {
  taskId: number;
  categoryId: number;
  beAfter: number;
}

export async function reorderTask(
  { beAfter, taskId, categoryId }: Props,
  api: Axios,
): Promise<Task> {
  const { data } = await api.put<Task>(`/tasks/${taskId}/reorder`, {
    beAfter,
    categoryId,
  });

  return data;
}
