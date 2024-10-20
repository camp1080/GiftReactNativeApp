import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PeopleScreen from "./pages/PeopleScreen.js";
import AddPeople from "./pages/AddPeople.js";
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="People"
          component={PeopleScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('AddPeople')}
                title="Add People"
                color="#0000FF"
                
              />
            ),
          })}
        />
        <Stack.Screen name="AddPeople" component={AddPeople} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });