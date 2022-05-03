import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/user/login/UserLogin'
import Main from '../screens/main/Main'

const NativeStack = createNativeStackNavigator();

function LoginStack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <NativeStack.Screen name="login" component={Login} />
      <NativeStack.Screen name="Main" component={Main}  />
    </NativeStack.Navigator>
  );
}

export default LoginStack;