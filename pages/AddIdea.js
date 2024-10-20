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
            <View style={styles.innerContainer}>
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
              <View style={styles.cameraContainer}>
                {!photo ? (
                  <CameraView
                    style={styles.cameraView}
                    facing={facing}
                    ref={(ref) => setCameraRef(ref)}
                  >
                    <View style={styles.cameraControls}>
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
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20, // Adding some space at the bottom
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
  cameraContainer: {
    flex: 2,
    justifyContent: "center",
  },
  cameraView: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 15,
  },
  cameraControls: {
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
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
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
  captureText: {
    fontSize: 18,
    color: "black",
  },
});
