// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const Container = Platform.OS === 'ios' ? SafeAreaView : View; // TODO: 플랫폼별 분기처리로 SafeArea 적용 
  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    console.log('스크롤 위치 y:', y);
  }
  return (
    <SafeAreaProvider>
      <Container style={styles.container} edges={['top', 'bottom']}>
        <ScrollView 
        style={styles.scrollView} 
        onScroll={handleScroll}
        scrollEventThrottle={1000}
        >
          <Text style={styles.text}>
          Lorem123 ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </Container>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // 이건 android의 statusBarHeight만 해당 
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
    padding: 12,
  }
});

export default App;