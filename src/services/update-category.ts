import { type Axios } from "axios";
import { type Category } from "~/protocols";

interface Props {
  categoryId: number;
  name: string;
}

export async function updateCategory(
  { name, categoryId }: Props,
  api: Axios,
): Promise<Category> {
  const { data } = await api.put<Category>(`/categories/${categoryId}`, {
    name,
  });

  return data;
}
