import axios from "axios";
import { env } from "~/env";

const axiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

export default axiosClient;
