import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Root from "./navigation/Root";
import store from "./store";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(1000);
  await SplashScreen.hideAsync();
}

export default function App() {
  delay_splash();
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
