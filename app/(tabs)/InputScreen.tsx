import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

export default function InputScreen() {
  const [title, setTitle] = useState("");
  const [rupees, setRupees] = useState("");
  const navigate = useNavigation();

  const addItem = async () => {
    if (!title || !rupees) {
      Alert.alert("Error", "Both fields are required!");
      return;
    }

    const newItem = { title, rupees };
    try {
      const existingItems = await AsyncStorage.getItem("items");
      const items = existingItems ? JSON.parse(existingItems) : [];
      items.push(newItem);
      await AsyncStorage.setItem("items", JSON.stringify(items));
      Alert.alert("Success", "Item added successfully!");
      setTitle("");
      setRupees("");
    } catch (e) {
      Alert.alert("Error", "Failed to save the item!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Rupees"
        keyboardType="numeric"
        value={rupees}
        onChangeText={setRupees}
      />
      <Button title="Add Item" onPress={addItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});
