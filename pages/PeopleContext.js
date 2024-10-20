import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const STORAGE_KEY = "people";

  // Load people from AsyncStorage
  useEffect(() => {
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPeople) setPeople(JSON.parse(savedPeople));
    };
    loadPeople();
    // console.log(people);
  }, []);

  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [],
    };
    const updatedPeople = [...people, newPerson];
    // console.log(updatedPeople);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const addIdea = async (id, text, img) => {
    const newIdea = {
      id: randomUUID(),
      text,
      img,
      width: 500,
      height: 500,
    };

    const updatedPeople = people.map((person) => {
      if (person.id === id) {
        return {
          ...person,
          ideas: [...person.ideas, newIdea],
        };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const removePerson = async (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const removeIdea = async (personId, ideaId) => {
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        return {
          ...person,
          ideas: person.ideas.filter((idea) => idea.id !== ideaId),
        };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  return (
    <PeopleContext.Provider
      value={{ people, addPerson, removePerson, addIdea, removeIdea }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
