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
import AddIcon from "../assets/images/plus.png";
import DeleteIcon from "../assets/images/delete.png";
import EditIcon from "../assets/images/edit.png";
import ListIcon from "../assets/images/list.png";
import ClearIcon from "../assets/images/close.png";
import BackIcon from "../assets/images/back.png";

export default function Lists() {
  const navigation: any = useNavigation();
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
    const filts: any = items?.filter((_, ind) => ind !== index);
    AsyncStorage.setItem("items", filts);
    setItems(filts);
  };
  const handleEdit = ({ index }: any) => {
    const fnd = items?.find((_, ind) => ind === index);
    navigation?.navigate("Create", { ...fnd, ind: index?.toString() });
  };
  return (
    <View style={styles.container}>
      {/* --------Header------ */}
      <View
        style={{
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
          onPress={() => navigation?.navigate("Create")}
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
          Home
        </Text>
      </View>

      {/* --------Header------ */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Text style={styles.title}>Expense List</Text> */}
        {/* <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          {items?.length && items?.[0]?.title != "" ? (
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
        </View> */}
      </View>
      <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#faeaf9",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginVertical: 10,
          }}
          onPress={() => navigation?.navigate("Create")}
        >
          <Image
            style={{ objectFit: "cover", height: 20, width: 20 }}
            source={AddIcon}
          />
          <Text style={{ color: "#98248e" }}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      {items?.length > 0 && items?.[0]?.title ? (
        <View>
          <Text style={{ fontFamily: "Nunito", fontWeight: "bold" }}>
            Last Added
          </Text>
        </View>
      ) : null}
      {items?.length === 0 || items?.[0]?.title == "" ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={styles.noItemsText}>No items found!</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <View style={styles.itemContainer}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <Image source={ListIcon} style={{ height: 20, width: 20 }} />
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>

                  <Text
                    style={{ fontSize: 9, color: "#999", fontFamily: "Nunito" }}
                  >
                    {new Date(item?.date)?.toDateString()}
                  </Text>
                </View>
              </View>
              {item.rupees ? (
                <Text style={styles.itemRupees}>Rs.{Number(item.rupees)?.toLocaleString()}</Text>
              ) : null}
              {/* {item.rupees ? (
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
              ) : null} */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 17,
                  borderRadius: 10,
                  // height: 20,
                  // width: 20,
                }}
                onPress={() => deleteItem({ index })}
              >
                <Image
                  style={{ objectFit: "cover", height: 5, width: 5 }}
                  source={ClearIcon}
                />
              </TouchableOpacity>
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
  noItemsText: { fontSize: 12, color: "#999", fontFamily: "Nunito" },
  itemContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,

    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 6,
    // elevation: 3,
  },
  itemTitle: { fontSize: 10, fontFamily: "Nunito" },
  itemRupees: { fontSize: 11, fontFamily: "Nunito" },
});
