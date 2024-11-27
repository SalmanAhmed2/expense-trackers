import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import ListScreen from "./(tabs)/ListScreen";
import InputScreen from "./(tabs)/InputScreen";

const Tab: any = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Add Item" component={InputScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
