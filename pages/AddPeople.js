import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";
import DatePicker from "react-native-modern-datepicker";
import PeopleContext from "./PeopleContext";

export default function AddPeople({ navigation }) {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.textBox}>
              <Text style={styles.text}>Name: </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                keyboardType="default" // Fixed typo
                maxLength={50} // Set as number
                placeholder="Enter person name"
                fontSize="16"
              />
            </View>

            <DatePicker
              onSelectedChange={(date) => setSelectedDate(date)}
              mode="calendar"
              current="1990-05-15" // Change if necessary
              style={styles.calendar}
            />
            <View style={styles.buttons}>
              <Button
                onPress={savePerson}
                title="Save"
                color="#2A0"
                disabled={text === "" || selectedDate === ""}
              />
              <Button
                onPress={() => navigation.goBack()}
                title="Cancel"
                color="#F00"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  },
  textBox: {
    marginTop: 30,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 270,
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
  },
});
