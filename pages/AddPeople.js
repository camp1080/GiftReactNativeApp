// go back go last page OK
// String input  Text String
// push name and date to the global (useState = "")
// Calendar useState = ""
// Two OnPress Save and Cancel //Bioth go back to the People Screen
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { useState, useContext } from "react";
import DatePicker from "react-native-modern-datepicker";
import PeopleContext from "./PeopleContext";

export default function AddPeople( {navigation}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [text, onChangeText] = useState("");
  const { addPerson } = useContext(PeopleContext);

  const savePerson = () => {
    if (text && selectedDate) {
      addPerson(text, selectedDate);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>Name: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          keyboardTyoe="default"
          maxLength="50"
          placeholder="Enter person name"
          fontSize="16"
        />
      </View>

      <DatePicker
        onSelectedChange={(date) => setSelectedDate(date)}
        mode="calendar"
        current="1990-05-15"
        style={styles.calendar}
      />
      <View style={styles.buttons}>
        <Button
          onPress={savePerson}
          title="Save"
          color="#2A0"
          style={styles.button}
          disabled={text === "" || selectedDate === ""}
        />
        <Button
          onPress={() => navigation.goBack()}
          title="Cancel"
          color="#F00"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendar: {
    marginTop: 30,
    flex: 1,
  },
  textBox: {
    marginTop: 30,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    // height: 36,
    width: 270,
    // borderWidth: 1,
    // borderRadius: 5,
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  buttons: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
  },
});
