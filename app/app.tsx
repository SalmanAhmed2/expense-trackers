import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "./(tabs)/ListScreen";
import InputScreen from "./(tabs)/InputScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "List") {
              iconName = "list";
            } else if (route.name === "Add Item") {
              iconName = "add-circle";
            }
            return null
          },
        })}
      >
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Add Item" component={InputScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
