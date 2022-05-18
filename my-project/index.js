import { registerRootComponent } from "expo";
import App from "./App";
import { LogBox, AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   console.log("Message handled in the background!", remoteMessage);
});

// axios.defaults.baseURL = "https://api.example.com";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

LogBox.ignoreLogs(["Setting a timer"]);
