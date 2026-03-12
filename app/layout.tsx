import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 300,
          presentation: "modal",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/home-screen" options={{ title: "Home" }} />
        <Stack.Screen
          name="screens/signup-screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/github-profile-screen"
          options={{
            title: "Developer Profiles",
            headerShown: true,
            headerStyle: { backgroundColor: "#f5f5f5" },
            headerTintColor: "#2c3e50",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
