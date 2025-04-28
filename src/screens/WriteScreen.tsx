import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { writeSlice } from '../redux/writeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from './components/CustomAlert'
import { MemoStorage } from '../persistance/memoStorage'


type WriteScreenProp = NativeStackScreenProps<RootStackParamList, 'Write'>

export default function WriteScreen({ navigation }: WriteScreenProp) {
  const dispatch = useDispatch()
  const titleValue = useSelector((state: RootState) => state.write.titleValue)
  const bodyValue = useSelector((state: RootState) => state.write.bodyValue)
  const refValue = useSelector((state: RootState) => state.write.refValue)

  const handleTitleValueChange = (value: string) => {
    dispatch(writeSlice.actions.setTitleValue(value))
  }
  const handleBodyValueChange = (value: string) => {
    dispatch(writeSlice.actions.setBodyValue(value))
  }
  const handleRefValueChange = (value: string) => {
    dispatch(writeSlice.actions.setRefValue(value))
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
            MemoStorage.saveMemo({title: titleValue, body: bodyValue, ref: refValue})
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
        dispatch(writeSlice.actions.setTitleValue(''))
        dispatch(writeSlice.actions.setBodyValue(''))
        dispatch(writeSlice.actions.setRefValue(''))
      }
    }, [dispatch])
  )
  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <SafeAreaProvider>
      <Container
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <KeyboardAvoidingView>
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.row}>
              <Text>제목</Text>
              <TextInput
                style={styles.input}
                value={titleValue}
                onChangeText={handleTitleValueChange}
                placeholder='제목'
              />
            </View>
            <View style={styles.row}>
              <Text>내용</Text>
              <TextInput
                style={styles.inputLong}
                value={bodyValue}
                onChangeText={handleBodyValueChange}
                placeholder='텍스트를 입력하세요'
                multiline
              />
            </View>
            <View style={styles.row}>
              <Text>출처</Text>
              <TextInput
                style={styles.input}
                value={refValue}
                onChangeText={handleRefValueChange}
                placeholder='출처'
              />
            </View>
            <Button title='저장' onPress={handleSave} />
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 400,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'baseline',
    // width: '80%',
    gap: 20,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  inputLong: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    height: 200,
    marginBottom: 10,
    textAlignVertical: 'top'
  }
})
