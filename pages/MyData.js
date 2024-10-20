import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyDataContext = createContext();

function MyDataProvider(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("an_asyncstorage_key").then((list) => {
      list = list === null ? [] : JSON.parse(list);
    });
  }, []);

  async function updateStorageData(list) {
    setData(list);
    await AsyncStorage.setItem("an_asyncstorage_key", JSON.stringify(list));
  }

  return (
    <MyDataProvider.Provider value={[data, updateStorageData]} {...props} />
  );
}

function useMyData() {
  //create a custom hook that can be called from components
  const context = useContext(MyDataContext);
  //we use the built-in useContext hook to access our own Context object.
  if (!context) throw new Error("Not inside the Provider");
  return context; // [data, updateStorageData]
  //we are returning our own state variable and function from UserContext Provider
}

//export the hook and the provider
export { useMyData, MyDataProvider };
