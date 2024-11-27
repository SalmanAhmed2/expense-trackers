import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "expo-router";
import AddIcon from "../../assets/images/plus.png";
import DeleteIcon from "../../assets/images/delete.png";
import EditIcon from "../../assets/images/edit.png";
import ClearIcon from "../../assets/images/close.png";
export default function ListScreen() {
  const navigation:any = useNavigation();
  const [focused, setFocused] = useState(false);
  const [items, setItems] = useState([{ title: "", rupees: "" }]);

  useFocusEffect(
    React.useCallback(() => {
      setFocused(true);
      return () => {
        setFocused(false);
      };
    }, [])
  );
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("items");
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [focused]);
  const handleClearAll = () => {
    try {
      AsyncStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = ({ index }: any) => {
    const filts:any = items?.filter((_, ind) => ind !== index);
    AsyncStorage.setItem("items", filts);
    setItems(filts);
  };
  const handleEdit = ({ index }: any) => {
    const fnd = items?.find((_, ind) => ind === index);
    navigation?.navigate("InputScreen", { ...fnd, ind: index?.toString() });
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
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              borderRadius: 10,
              height: 20,
              width: 20,
            }}
            onPress={() => navigation?.navigate("InputScreen")}
          >
            <Image
              style={{ objectFit: "cover", height: 20, width: 20 }}
              source={AddIcon}
            />
          </TouchableOpacity>
          {items?.length && items?.[0]?.title ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#f1f1f1",
                padding: 3,
                height: 20,
                width: 20,
                borderRadius: 10,
              }}
              onPress={handleClearAll}
            >
              <Image
                style={{ objectFit: "cover", height: 15, width: 15 }}
                source={ClearIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {items?.length === 0 || items?.[0]?.title ? (
        <Text style={styles.noItemsText}>No items found</Text>
      ) : (
        <FlatList
          data={items}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.rupees ? (
                <Text style={styles.itemRupees}>Rs.{item.rupees}</Text>
              ) : null}
              {item.rupees ? (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                    }}
                    onPress={() => handleEdit({ index })}
                  >
                    <Image
                      style={{ objectFit: "cover", height: 20, width: 20 }}
                      source={EditIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                    }}
                    onPress={() => deleteItem({ index })}
                  >
                    <Image
                      style={{ objectFit: "cover", height: 20, width: 20 }}
                      source={DeleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  noItemsText: { fontSize: 16, color: "#999" },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  itemTitle: { fontSize: 18 },
  itemRupees: { fontSize: 18, color: "#888" },
});
