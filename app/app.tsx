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
        {/* Customizing the List screen */}
        <Tab.Screen
          name="List"
          component={Lists}
          // options={{
          //   headerTitle: "My Custom List", // Change the header title
          //   headerStyle: { backgroundColor: "#6200ee" }, // Custom header background color
          //   headerTintColor: "#fff", // Custom header text color
          //   headerTitleStyle: { fontWeight: "bold" }, // Custom header text style
          // }}
        />
        {/* Customizing the Add Item screen */}
        <Tab.Screen
          name="Add Item"
          component={Create}
          // options={{
          //   headerTitle: "Create New Item",
          //   headerStyle: { backgroundColor: "#03dac6" },
          //   headerTintColor: "#000",
          //   headerTitleStyle: { fontWeight: "bold" },
          // }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
