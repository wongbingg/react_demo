import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { TextInput } from 'react-native-gesture-handler'

type WriteScreenProp = NativeStackScreenProps<RootStackParamList, 'Write'>

export default function WriteScreen({ navigation }: WriteScreenProp) {
  
  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
