import defaultAxios from "axios";
import {API_CONFIG} from "src/config/api.config";

export const axios = defaultAxios.create({
  baseURL: API_CONFIG.API_URL
});
