import { type Axios } from "axios";
import { type Category } from "~/protocols";

interface Props {
  name: string;
}

export async function createCategory(
  { name }: Props,
  api: Axios,
): Promise<Category> {
  const { data } = await api.post<Category>("/categories", {
    name,
  });

  return data;
}
