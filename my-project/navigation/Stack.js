import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>go back</Text>
  </TouchableOpacity>
);

// const NativeStack = createNativeStackNavigator();

// const Stack = () => (
//   <NativeStack.Navigator>
//     <NativeStack.Screen name="one" component={ScreenOne}></NativeStack.Screen>
//     <NativeStack.Screen name="Two" component={ScreenTwo}></NativeStack.Screen>
//     <NativeStack.Screen
//       name="Three"
//       component={ScreenThree}
//     ></NativeStack.Screen>
//   </NativeStack.Navigator>
// );

export default Stack;
