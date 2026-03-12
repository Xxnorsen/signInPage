import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import GitHubUserCard from "../../components/GitHubUserCard";

export default function GitHubProfileScreen() {
  const [username, setUsername] = useState("1");
  const [inputUsername, setInputUsername] = useState("");

  const handleSearch = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
    } else {
      Alert.alert("Error", "Please enter a GitHub username");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Ionicons name="logo-github" size={48} color="#2c3e50" />
        <Text style={styles.title}>Developer Profiles</Text>
        <Text style={styles.subtitle}>
          Find restaurant developers on GitHub
        </Text>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.searchLabel}>Enter GitHub Username</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="e.g. octocat, torvalds"
            value={inputUsername}
            onChangeText={setInputUsername}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            editable={true}
            selectTextOnFocus={true}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsSection}>
        <Text style={styles.resultsTitle}>Profile Results</Text>
        <Text style={styles.currentSearch}>Searching for: @{username}</Text>
        <GitHubUserCard userId={username} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  searchSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#2c3e50",
  },
  searchButton: {
    backgroundColor: "#228b22",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  currentSearch: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 20,
    fontStyle: "italic",
  },
});
