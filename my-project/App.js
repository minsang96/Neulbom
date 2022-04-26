import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stack from "./navigation/Stack";
import Tabs from "./navigation/Tabs";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs></Tabs>
      {/* <Stack></Stack> */}
    </NavigationContainer>
  );
}
