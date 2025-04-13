// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React, { useState } from 'react';
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

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
}

const App: React.FC<Props> = ({
  name,
  baseEnthusiasmLevel = 0,
}) => {
  const Container = Platform.OS === 'ios' ? SafeAreaView : View; // TODO: 플랫폼별 분기처리로 SafeArea 적용 

  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(baseEnthusiasmLevel,);
  const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () => setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);
  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';



  return (
    <SafeAreaProvider>
      <Container style={styles.container} edges={['top', 'bottom']}>
        <Text
          style={{ fontSize: 35 }}>
          Hello {name} {getExclamationMarks(enthusiasmLevel)}
        </Text>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel='increment'
          onPress={onIncrement}
          color='blue' />
        <Button
          title='Decrease enthusiasm'
          accessibilityLabel='decrement'
          onPress={onDecrement}
          color='red' />
        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}}/>
          <View style={{flex: 2, backgroundColor: 'skyblue'}}/>
          <View style={{flex: 3, backgroundColor: 'steelblue'}}/>
        </View>
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
});

export default App;