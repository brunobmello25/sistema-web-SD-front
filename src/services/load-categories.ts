import { type Axios } from "axios";
import { type Category } from "~/protocols";

export async function loadCategories(api: Axios): Promise<Category[]> {
  console.log("defaults: " + api.defaults.params);

  const { data } = await api.get<Category[]>("/categories");

  return data;
}
