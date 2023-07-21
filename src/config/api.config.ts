const mode = process.env.NODE_ENV as "production" | "development";
const envApiUrl = process.env.REACT_APP_API_URL;

let apiUrl: string;
if (mode === "production") {
  apiUrl = "/api";
} else {
  apiUrl = envApiUrl || "http://localhost:5000/api";
}

export const API_CONFIG = {
  API_URL: apiUrl
};
