import { Stack } from "expo-router";
import { ProfileProvider } from "./components/ProfileContext";

export default function RootLayout() {
  return (
    <ProfileProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ProfileProvider>
  );
}
