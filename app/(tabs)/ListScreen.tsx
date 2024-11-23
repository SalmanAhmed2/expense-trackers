import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListScreen() {
  const [items, setItems] = useState([{ title: "", rupees: "" }]);

  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = await AsyncStorage.getItem("items");
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };
    fetchItems();
  }, [AsyncStorage]);
  const handleClearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Expense List</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            paddingVertical: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ color: "#fff", fontWeight: "bold" }}
            onPress={handleClearAll}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      {items.length === 0 ? (
        <Text style={styles.noItemsText}>No items found</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.rupees ? (
                <Text style={styles.itemRupees}>Rs.{item.rupees}</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  noItemsText: { fontSize: 16, color: "#999" },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemTitle: { fontSize: 18 },
  itemRupees: { fontSize: 18, color: "#888" },
});
