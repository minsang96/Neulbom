import { registerRootComponent } from "expo";
import App from "./App";
import { LogBox } from "react-native";

// axios.defaults.baseURL = "https://api.example.com";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

LogBox.ignoreLogs(["Setting a timer"]);
