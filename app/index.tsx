import { Redirect } from 'expo-router';

export default function Index() {
  // Automatically routes the user straight into your main dashboard tab layout
  return <Redirect href="/(tabs)" />;
}