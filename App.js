import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigator from "./Navigator.js";
import { PeopleProvider } from "./pages/PeopleContext.js";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PeopleProvider>
          <Navigator />
        </PeopleProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}