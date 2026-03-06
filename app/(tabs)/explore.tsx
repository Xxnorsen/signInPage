import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="search"
          size={50}
          color="#808080"
          style={styles.headerIcon}
        />
        <Text style={styles.title}>Explore</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          This app includes example code to help you get started.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File-based routing</Text>
          <Text style={styles.sectionText}>
            This app has two screens: app/(tabs)/index.tsx and
            app/(tabs)/explore.tsx
          </Text>
          <Text style={styles.sectionText}>
            The layout file in app/(tabs)/_layout.tsx sets up the tab navigator.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Android, iOS, and web support</Text>
          <Text style={styles.sectionText}>
            You can open this project on Android, iOS, and the web.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.sectionText}>• Sign-up form with validation</Text>
          <Text style={styles.sectionText}>• Animated hero images</Text>
          <Text style={styles.sectionText}>• Keyboard dismissal on tap</Text>
          <Text style={styles.sectionText}>
            • Error handling with red messages
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 5,
    lineHeight: 20,
  },
});
