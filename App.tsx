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
  FlatList,
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
        <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie1'},
          {key: 'Julie2'},
          {key: 'Julie3'},
          {key: 'Julie4'},
          {key: 'Julie5'},
          {key: 'Julie6'},
          {key: 'Julie7'},
          {key: 'Julie8'},
          {key: 'Julie9'},
          {key: 'Julie0'},
          {key: 'Julie11'},
          {key: 'Julie12'},
          {key: 'Julie13'},
          {key: 'Julie14'},
          {key: 'Julie15'},
        ]}
        renderItem={({item}) => 
        <Text style={styles.item}>
          {item.key}
        </Text>
      }
        >
          
        </FlatList>
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;