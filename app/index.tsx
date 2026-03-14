import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My First App</Text>
      <Text style={styles.subtitle}>Choose a task to work on:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/signup-screen")}
      >
        <Text style={styles.buttonText}>Sign Up Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.apiButton]}
        onPress={() => router.push("/screens/test-api")}
      >
        <Text style={styles.buttonText}>API Test (GitHub)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#666",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    minWidth: 200,
    alignItems: "center",
  },
  apiButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
