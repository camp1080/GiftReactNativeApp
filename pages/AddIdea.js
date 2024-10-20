// Name of the user
// TextInput to the name of the idea
// camera API <ExpoCamera>
// Take a shot
// Save and Cancel Buttons ... Cancel go back to the People Screen
// when Saved
// go back to idea and display
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";
import { useCameraPermissions, CameraView } from "expo-camera";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PeopleContext from "./PeopleContext";

export default function AddPeople({ navigation, route }) {
  const [text, onChangeText] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const { addIdea } = useContext(PeopleContext);
  const { name, id } = route.params;

  // console.log(name, id);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri); // Set the photo URI to display
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const saveIdea = () => {
    if (text && photo) {
      addIdea(id, text, photo);
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
            <View style={{ flex: 1 }}>
              <View style={styles.textBox}>
                <Text style={styles.text}>Name: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  keyboardType="default"
                  maxLength={50}
                  placeholder="Enter gift idea"
                  fontSize={16}
                />
              </View>
              <View style={{ flex: 2 }}>
                {!photo ? (
                  <CameraView
                    style={{ flex: 1, marginHorizontal: 30, marginTop: 15 }}
                    facing={facing}
                    ref={(ref) => setCameraRef(ref)}
                  >
                    <View style={styles.cameraContainer}>
                      <TouchableOpacity
                        style={styles.flipButton}
                        onPress={toggleCameraFacing}
                      >
                        <FontAwesome name="rotate-right" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.captureButton}
                        onPress={takePicture}
                      >
                        <FontAwesome name="camera" />
                      </TouchableOpacity>
                    </View>
                  </CameraView>
                ) : (
                  <View style={styles.previewContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      style={styles.captureButton}
                      onPress={() => setPhoto(null)}
                    >
                      <Text style={styles.captureText}>Retake</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={styles.buttons}>
                <Button
                  onPress={saveIdea}
                  title="Save"
                  color="#2A0"
                  style={styles.button}
                  disabled={text === "" || photo === null}
                />
                <Button
                  onPress={() => navigation.goBack()}
                  title="Cancel"
                  color="#F00"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  flipText: {
    fontSize: 18,
    color: "black",
  },
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  captureText: {
    fontSize: 18,
    color: "black",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
});
