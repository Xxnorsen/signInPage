import React, { useEffect, useState } from "react";
import { githubAPI } from "../services/api";

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  html_url: string;
}

export const useGitHubAPI = (userId: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = await githubAPI.getUser(userId);
      setUser(userData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user data",
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
};
