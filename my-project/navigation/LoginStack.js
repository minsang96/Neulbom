import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/user/login/UserLogin'
import MainPage from '../screens/mainpage/MainPage'
import UserSignUp from '../screens/user/userSignup/UserSignUp';
import ConsultantSignUp from '../screens/user/consultantSignup/ConsultantSignUp';
import SuccessSignUpUser from '../screens/user/userSignup/SuccessSignUpUser';
import SuccessSignUpConsultant from '../screens/user/consultantSignup/SuccessSignUpConsultant'
import Chat from '../screens/chat/Chat'
import CheckImage from '../screens/user/consultantSignup/CheckImage';

const NativeStack = createNativeStackNavigator();

function LoginStack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false
        }}
        name="login"
        component={Login}
      />
      <NativeStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false
        }}
        name="MainPage"
        component={MainPage}
      />
      <NativeStack.Screen
        options={{ title: '일반회원 회원가입' }}
        name="UserSignUp"
        component={UserSignUp}
      />
      <NativeStack.Screen
        options={{ title: '전문가 회원가입' }}
        name="ConsultantSignUp"
        component={ConsultantSignUp}
      />
      <NativeStack.Screen
        options={{ title: '전문가 회원가입' }}
        name="CheckImage"
        component={CheckImage}
        getId={({params}) => params.imgType}
      />
      <NativeStack.Screen
        options={{ title: '일반회원 회원가입' }}
        name="SuccessSignUpUser"
        component={SuccessSignUpUser}
      />
      <NativeStack.Screen
        options={{ title: '전문가 회원가입' }}
        name="SuccessSignUpConsultant"
        component={SuccessSignUpConsultant}
      />
      <NativeStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false
        }}
        name="Chat"
        component={Chat}
      />
    </NativeStack.Navigator>
  );
}

export default LoginStack;