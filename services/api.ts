import axios, { isAxiosError } from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

const apiClient = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
  },
});

export const githubAPI = {
  getUser: async (userId: string) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("API Error:", error.message);
        if (error.response) {
          console.error("Status:", error.response.status);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  },
};

export default apiClient;
