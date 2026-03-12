import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGitHubAPI } from "../hooks/useGitHubAPI";

interface GitHubUserCardProps {
  userId: string;
}

export const GitHubUserCard: React.FC<GitHubUserCardProps> = ({ userId }) => {
  const { user, loading, error, refetch } = useGitHubAPI(userId);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading GitHub user...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No user data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name || user.login}</Text>
        <Text style={styles.username}>@{user.login}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
        {user.company && (
          <Text style={styles.company}>Company: {user.company}</Text>
        )}
        {user.location && (
          <Text style={styles.location}>Location: {user.location}</Text>
        )}
        {user.blog && <Text style={styles.blog}>Website: {user.blog}</Text>}
        {user.email && <Text style={styles.email}>Email: {user.email}</Text>}

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.public_repos}</Text>
            <Text style={styles.statLabel}>Repos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}>
            Joined: {new Date(user.created_at).toLocaleDateString()}
          </Text>
          <Text style={styles.detailText}>
            Last Updated: {new Date(user.updated_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userInfo: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  company: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  blog: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  details: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    width: "100%",
  },
  detailText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
  },
});

export default GitHubUserCard;
