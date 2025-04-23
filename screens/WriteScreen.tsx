import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Alert, Platform } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { writeSlice } from '../redux/writeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { saveTable } from '../persistance/sqliteStorage'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from './components/CustomAlert'


type WriteScreenProp = NativeStackScreenProps<RootStackParamList, 'Write'>

export default function WriteScreen({ navigation }: WriteScreenProp) {
  const dispatch = useDispatch()
  const textValue = useSelector((state: RootState) => state.write.value)

  const handleInputChange = (value: string) => {
    dispatch(writeSlice.actions.inputText(value))
  }

  const handleSave = () => {
    Alert.alert(
      '확인',
      '저장하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            saveTable('test', { text: textValue })
            navigation.goBack()
          },
        },
      ],
      { cancelable: true }
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(writeSlice.actions.inputText(''))
      }
    }, [dispatch])
  )
  const Container = Platform.OS === 'ios' ? SafeAreaView : View;
  return (
    <SafeAreaProvider>
      <Container
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0, }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          extraScrollHeight={20}
          enableOnAndroid={true}
        >
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={textValue}
              onChangeText={handleInputChange}
              placeholder='텍스트를 입력하세요'
            />
            <Button title='저장' onPress={handleSave} />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 10
  }
})
