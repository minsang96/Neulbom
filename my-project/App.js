import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Stack from "./navigation/Stack";
import Tabs from "./navigation/Tabs";
import Root from "./navigation/Root";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root></Root>
        {/* <Tabs></Tabs> */}
        {/* <Stack></Stack> */}
      </NavigationContainer>
    </Provider>
  );
}
