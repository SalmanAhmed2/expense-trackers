import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import ListIcon from "../assets/images/clipboard.png";
import BackIcon from "../assets/images/back.png";

export default function Create() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [title, setTitle] = useState("");
  const [rupees, setRupees] = useState("");

  const addItem = async () => {
    if (!title || !rupees) {
      Alert.alert("Error", "Both fields are required!");
      return;
    }
    const date = new Date();
    const newItem = { title, rupees, date };
    try {
      const existingItems: any = await AsyncStorage.getItem("items");
      if (route?.params) {
        const filts = JSON?.parse(existingItems)?.map((it: any, ind: any) =>
          ind?.toString() === route?.params?.ind ? newItem : it
        );
        await AsyncStorage.setItem("items", JSON.stringify(filts));
      } else {
        const items = existingItems ? JSON.parse(existingItems) : [];
        items.push(newItem);
        await AsyncStorage.setItem("items", JSON.stringify(items));
      }
      navigation?.navigate("index"); // Correct tab name
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
      {/* <-----> Header <-----> */}
      <View
        style={{
          height: "5%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#f1f1f1", borderRadius: 5, padding: 3 }}
          onPress={() => navigation?.navigate("index")}
        >
          <Image source={BackIcon} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Nunito",
            width: "60%",
            fontWeight: "bold",
            // textAlign: "start",
          }}
        >
          Add Expense
        </Text>
      </View>
      {/* <-----> Header <-----> */}
      <View style={{ display: "flex" }}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              fontFamily: "Nunito",
              marginVertical: 5,
            }}
          >
            Expense
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              fontFamily: "Nunito",
              marginVertical: 5,
            }}
          >
            Amount
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Rupees"
            keyboardType="numeric"
            value={rupees}
            onChangeText={(e) => setRupees(e)}
          />
        </View>
        {/* 
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
  
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              borderRadius: 10,
              paddingHorizontal: 20,
              backgroundColor: "#f1f1f1",
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
            onPress={() => navigation?.navigate("index")}
          >
            <Text>Go to List</Text>
            <Image style={{ height: 20, width: 20 }} source={ListIcon} />
          </TouchableOpacity> 
        </View>
          */}
      </View>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          borderRadius: 5,
          paddingHorizontal: 20,
          backgroundColor: "#800080",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 5,
        }}
        onPress={addItem}
      >
        <Text style={{ color: "#fff" }}>
          {route?.params?.ind ? "Update Item" : "Add Item"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 16,
    borderRadius: 7,
    fontSize: 10,
    fontFamily: "Nunito",
    color: "#999",
  },
});
