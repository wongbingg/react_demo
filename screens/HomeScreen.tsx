import React, { useCallback } from 'react'
import { View, Button, Text, StyleSheet, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; }) // 뒤로가기 무시
      return () => backHandler.remove();
    }, [])
  );

  const handleLogout = () => {
    navigation.goBack();
  }
  const handleProfile = () => {
    navigation.navigate('Profile')
  }
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text>안녕하세요, {id} 님</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Profile" onPress={handleProfile} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
