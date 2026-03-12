import axios, { isAxiosError } from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
  },
});

// GitHub API service
export const githubAPI = {
  // Get user by ID
  getUser: async (userId: string) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  },

  // Get user repositories
  getUserRepos: async (username: string) => {
    try {
      const response = await apiClient.get(`/users/${username}/repos`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  },
};

export default apiClient;
