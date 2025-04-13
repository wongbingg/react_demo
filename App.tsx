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
  SectionList,
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
        <SectionList
          sections={[
            {
              title: 'D',
              data: ['Devin', 'Dan', 'Dominic']
            },
            {
              title: 'J',
              data: ['Jackson','James','Jillian','Jimmy','Joel','John','Julie']
            },
            {
              title: 'I',
              data: ['Jackson','James','Jillian','Jimmy','Joel','John','Julie']
            },
            {
              title: 'G',
              data: ['Jackson','James','Jillian','Jimmy','Joel','John','Julie']
            }
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={item => `basicListEntry-${item}`} // 특이하게 백틱(`) 을 사용했음. 
        />
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
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247, 247, 247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;