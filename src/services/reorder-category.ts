import { type Axios } from "axios";
import { type Category } from "~/protocols";

interface Props {
  categoryId: number;
  beAfter: number;
}

export async function reorderCategory(
  { beAfter, categoryId }: Props,
  api: Axios,
): Promise<Category> {
  const { data } = await api.put<Category>(
    `/categories/${categoryId}/reorder`,
    {
      beAfter,
    },
  );

  return data;
}
