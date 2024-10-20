// Add Person Button Stack navigator
// People List
// Display the names in a FlatList by birthday date -> Month -> Day
// Swipe to delete
// Icon to go to addIdeasScrren onOPress navigation <> pass name and id (uuid) of the user
import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, FlatList, Pressable } from "react-native";
import PeopleContext from "./PeopleContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Swipeable } from "react-native-gesture-handler";

export default function PeopleScreen() {
const { people } = useContext(PeopleContext);
const { removePerson } = useContext(PeopleContext);

// console.log(people[0].dob.slice(5, 7));

people.sort((a, b) => {
  const monthA = parseInt(a.dob.slice(5, 7), 10);
  const dayA = parseInt(a.dob.slice(8, 10), 10);
  const monthB = parseInt(b.dob.slice(5, 7), 10);
  const dayB = parseInt(b.dob.slice(8, 10), 10);

  if (monthA !== monthB) {
    return monthA - monthB;
  }
  
  return dayA - dayB;
});

const renderRightActions = (item) => (
  <View style={styles.deleteContainer}>
    <FontAwesome.Button 
      name="trash" 
      backgroundColor="red" 
      onPress={() => removePerson(item.id)}
    >
      Delete
    </FontAwesome.Button>
  </View>
);

  return (
    <SafeAreaView styles={styles.container}>

        <FlatList
          data={people}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
            <View style={styles.personContainer}>
              {/* {console.log("I'm here?" + item.id)} */}
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.dobText}>{item.dob}</Text>
              <FontAwesome.Button 
                style={styles.iconButton}
                iconStyle={{marginLeft: 8}} 
                name="lightbulb-o" 
                backgroundColor="#333" 
                // onPress={() =>
                // console.log("working!")
              // }
                onPress={() => removePerson(item.id)}
              >    
              </FontAwesome.Button>
            </View>
            </Swipeable>
          )}
        />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  personContainer: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 15
  },
  nameText: {
    flex: 2
  },
  dobText: {
    flex: 2
  },
  iconButton: {
    flex: 2,
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 160,
    height: 50,
    marginTop: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
