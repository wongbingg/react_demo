import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <Text>나의 프로필 정보</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
