// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import WriteScreen from './screens/WriteScreen';
import MemoScreen from './screens/MemoScreen';
import LoginScreen_Phone from './screens/LoginScreen_Phone';
import { AuthRepository } from './network/authRepository';
import SignUpScreen from './screens/SignUpScreen';
import { MyAsyncStorage } from './persistance/asyncStorage';

export type RootStackParamList = {
  Login: undefined;
  Login_Phone: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
  Write: undefined;
  Memo: { id: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  // mark; 앱 런칭 타이밍
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessToken = await MyAsyncStorage.load('ACCESS_TOKEN')
        const res = await AuthRepository.loginValidate({ accessToken: accessToken, token: 'empty' })

        if (res.code === 0) {
          // todo; 홈스크린으로 이동 
          MyAsyncStorage.save('IS_LOGIN', 'Y')
        } else {
          // todo; 로그인화면 유지
          MyAsyncStorage.save('IS_LOGIN', 'N')
        }
      } catch (err) {
        MyAsyncStorage.save('IS_LOGIN', 'N')
        console.error(err);
      }
    }
    checkAccessToken()
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerLeft: () => null,
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Write"
            component={WriteScreen}
          />
          <Stack.Screen
            name="Memo"
            component={MemoScreen}
          />
          <Stack.Screen
            name="Login_Phone"
            component={LoginScreen_Phone}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}