import React, { useEffect, useState } from "react";
import { githubAPI } from "../services/api";

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  html_url: string;
  node_id: string;
  gravatar_id: string;
  url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  hireable: boolean | null;
  twitter_username: string | null;
  public_gists: number;
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
