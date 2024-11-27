import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type TabParamList = {
  List: undefined;
  InputScreen: undefined;
};

type InputScreenProps = BottomTabScreenProps<TabParamList, "InputScreen">;

export default function InputScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [title, setTitle] = useState("");
  const [rupees, setRupees] = useState("");

  const addItem = async () => {
    if (!title || !rupees) {
      Alert.alert("Error", "Both fields are required!");
      return;
    }

    const newItem = { title, rupees };
    try {
      const existingItems: any = await AsyncStorage.getItem("items");
      if (route?.params) {
        console.log();

        const filts = JSON?.parse(existingItems)?.map((it: any, ind: any) =>
          ind?.toString() === route?.params?.ind ? newItem : it
        );
        await AsyncStorage.setItem("items", JSON.stringify(filts));
      } else {
        const items = existingItems ? JSON.parse(existingItems) : [];
        items.push(newItem);
        await AsyncStorage.setItem("items", JSON.stringify(items));
      }
      navigation?.navigate("ListScreen"); // Correct tab name
      Alert.alert("Success", "Item added successfully!");
      setTitle("");
      setRupees("");
    } catch (e) {
      Alert.alert("Error", "Failed to save the item!");
    }
  };
  useEffect(() => {
    setTitle(route?.params?.title);
    setRupees(route?.params?.rupees);
  }, [route]);

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
      <Button
        title={route?.params?.ind ? "Update Item" : "Add Item"}
        onPress={addItem}
      />
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
