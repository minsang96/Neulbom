import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Stack from "./navigation/Stack";
import Tabs from "./navigation/Tabs";
import Root from "./navigation/Root";

export default function App() {
  return (
    <NavigationContainer>
      <Root></Root>
      {/* <Tabs></Tabs> */}
      {/* <Stack></Stack> */}
    </NavigationContainer>
  );
}
