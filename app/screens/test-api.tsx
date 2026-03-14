import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function TestApi() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.github.com/users/1");
        console.log(JSON.stringify(response.data, null, 2));
        setData(response.data);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderData = (obj: any, level = 0) => {
    if (!obj || typeof obj !== "object") return null;

    return Object.entries(obj).map(([key, value]) => {
      if (value === null || value === undefined) {
        return (
          <Text key={key} style={{ marginLeft: level * 15 }}>
            {key}: null
          </Text>
        );
      }

      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <View key={key} style={{ marginLeft: level * 15 }}>
            <Text style={styles.bold}>{key}:</Text>
            {renderData(value, level + 1)}
          </View>
        );
      }

      return (
        <Text key={key} style={{ marginLeft: level * 15 }}>
          {key}: {value.toString()}
        </Text>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Response</Text>
      <View style={styles.box}>{renderData(data)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  box: { backgroundColor: "white", padding: 15, borderRadius: 8 },
  bold: { fontWeight: "bold" },
});
