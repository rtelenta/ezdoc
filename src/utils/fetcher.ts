import { constants } from "@/config/constants";
import axios from "axios";

export const fetcher = axios.create({
  baseURL: constants.API_URL,
  adapter: "fetch",
});
