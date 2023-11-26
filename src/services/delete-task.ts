import { type Axios } from "axios";

type Props = {
  taskId: number;
};

export async function deleteTask({ taskId }: Props, api: Axios): Promise<void> {
  await api.delete<void>(`/tasks/${taskId}`);
}
