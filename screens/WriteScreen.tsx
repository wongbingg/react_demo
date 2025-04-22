import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { writeSlice } from '../redux/writeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type WriteScreenProp = NativeStackScreenProps<RootStackParamList, 'Write'>

export default function WriteScreen({ navigation }: WriteScreenProp) {
  const dispatch = useDispatch()
  const textValue = useSelector((state: RootState) => state.write.value)

  const handleInputChange = (value: string) => {
    dispatch(writeSlice.actions.inputText(value))
  }

  const handleSave = () => {
    // TODO: 로컬 DB 에 저장 
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(writeSlice.actions.inputText(''))
      }
    }, [dispatch])
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={textValue}
        onChangeText={handleInputChange}
        placeholder='텍스트를 입력하세요'
      />
      <Button title='저장' onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
