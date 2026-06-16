import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Hide bottom tab bar
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search & History",
        }}
      />
    </Tabs>
  );
}