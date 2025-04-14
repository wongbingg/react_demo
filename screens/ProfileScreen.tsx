import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type ProfileScreenProp = NativeStackScreenProps<RootStackParamList, 'Profile'>

export default function ProfileScreen({ navigation }: ProfileScreenProp) {

  return (
    <View style={styles.container}>
      <Text>나의 프로필 정보</Text>
      <Button title="Pop To Top" onPress={() => navigation.popToTop()}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
