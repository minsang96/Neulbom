import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import LoginStack from "./LoginStack";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import userSlice from "../slices/user";
// import SplashScreen from 'react-native-splash-screen';

const Nav = createNativeStackNavigator();


function Root () {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.accessToken)
  useEffect(() => {
    if (!isLoggedIn) {
      const getUserSessionAndLogin = async () => {
        try {
          const session = await EncryptedStorage.getItem("user_session");
          // if (!session) {
          //   SplashScreen.hide();
          //   return;
          // }
          let JsonSession
          if (session !== undefined) {
            JsonSession = JSON.parse(session)
          }
          const res = await axios.post('https://k6a104.p.ssafy.io/api/user/login', {
            userEmail: JsonSession.email,
            userPwd: JsonSession.password
          })
          dispatch(userSlice.actions.login(res.data.data))
          try {
            const response = await axios.get('https://k6a104.p.ssafy.io/api/member/info', {
              headers: { Authorization: res.data.data.accessToken },
              params: { userSeq: res.data.data.userSeq }
            })
            dispatch(userSlice.actions.setUserInfo(response.data.data))
            console.log(response.data.data)
          } catch(err) {
            console.log(err)
          }
        } catch(error) {
          console.log('error: '+error)
        } finally {
      
        }
      }
      getUserSessionAndLogin()
      console.log(isLoggedIn)
    }
  }, [])

  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
    {/* <Nav.Screen name="Tabs" component={Tabs} /> */}
    {isLoggedIn ? <Nav.Screen name="Tabs" component={Tabs} /> :
    <Nav.Screen name="LoginStack" component={LoginStack} />}
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
  ) 
};


export default Root;
