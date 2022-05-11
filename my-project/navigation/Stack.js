import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import FoodWrite from "../screens/mainpage/foodCamera/FoodWrite";
import Diet from "../components/diets/Diet";
import SnackWrite from "../screens/mainpage/foodCamera/SnackWrite";
import FoodSearch from "../screens/mainpage/foodCamera/FoodSearch";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const ScreenOne = ({ navigation: { navigate } }) => {
  const routesLength = useNavigationState((state) => state.routes);
  console.log(routesLength);
  return (
    <TouchableOpacity onPress={() => navigate("Two")}>
      <Text>go to two</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello!" })}>
    <Text>Change title</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
    <NativeStack.Screen
      name="FoodWrite"
      component={FoodWrite}
      // initialParams={{ current: "dinner" }}
    />
    <NativeStack.Screen name="SnackWrite" component={SnackWrite} />
    <NativeStack.Screen name="Diet" component={Diet} />
    <NativeStack.Screen name="FoodSearch" component={FoodSearch} />
  </NativeStack.Navigator>
);

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
