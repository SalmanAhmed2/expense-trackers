import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lists from ".";
import Create from "./Create";

const Tab: any = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="List" component={Lists} />
        <Tab.Screen name="Add Item" component={Create} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
