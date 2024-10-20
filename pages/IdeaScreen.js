// Add Idead
// Present the Ideas
// back navigation is automatic made
// go to App Idea Screen

import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import PeopleContext from "./PeopleContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function PeopleScreen({ navigation, route }) {
  const { people, removeIdea } = useContext(PeopleContext);
  const { name, id } = route.params;

  const currentPerson = people.find((people) => people.id === id);
  console.log(
    `This are the ideas of ${name} ` +
      `${currentPerson.ideas} ${currentPerson.dob}`
  );

  function showIdea() {
    if (currentPerson.ideas.length === 0) {
      return (
        <Text style={styles.container}>
          No ideas for {name} {":("}
        </Text>
      );
    } else {
      return (
        // Added return here
        <FlatList
          data={currentPerson.ideas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ideaContainer}>
              <View style={styles.textImage}>
                <Text style={styles.nameText}>{item.text}</Text>
                <Image
                  source={{ uri: item.img }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View style={styles.iconDistance}>
                <FontAwesome.Button
                  style={styles.iconButton}
                  iconStyle={{ marginLeft: 8 }}
                  name="trash-o"
                  backgroundColor="#333"
                  onPress={() => removeIdea(id, item.id)}
                />
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      );
    }
  }

  console.log(people);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Ideas for {name}</Text>
      {showIdea()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  title: {
    justifyContent: "center",
    fontSize: 32,
    marginHorizontal: 15,
    marginTop: 10,
  },
  textImage: {
    marginHorizontal: 15,
    fontSize: 18,
    flex: 1, // Make the text and image take up available space
  },
  ideaContainer: {
    flexDirection: "row",
    borderColor: "#333",
    borderWidth: 1, // Added borderWidth to make the border visible
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    justifyContent: "space-between", // Space between textImage and icon
    alignItems: "center",
    marginHorizontal: 15,
  },
  nameText: {
    flex: 1, // Allow nameText to take up space
  },
  iconDistance: {
    alignSelf: "flex-start",
  },
});
