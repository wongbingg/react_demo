import React, { useEffect } from 'react'
import { View, Button, StyleSheet, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; }) // 뒤로가기 무시
    return () => backHandler.remove();
  }, []);

  const handleLogout = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
