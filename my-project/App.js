import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Root from "./navigation/Root";
import store from "./store";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.block}>
        <Root></Root>
        {/* <Tabs></Tabs> */}
        {/* <Stack></Stack> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "white",
  },
});
