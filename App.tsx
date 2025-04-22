// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import WriteScreen from './screens/WriteScreen';
import { load } from './persistance/asyncStorage';
import { MemoCell } from './screens/components/MemoCell';
import MemoScreen from './screens/MemoScreen';
import ExampleScreen from './screens/ExampleScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Write: undefined;
  Memo: { id: string };
  Example: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: true,
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
            name="Example"
            component={ExampleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}