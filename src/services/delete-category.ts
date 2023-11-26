import { type Axios } from "axios";

type Props = {
  categoryId: number;
};

export async function deleteCategory(
  { categoryId }: Props,
  api: Axios,
): Promise<void> {
  await api.delete<void>(`/categories/${categoryId}`);
}
