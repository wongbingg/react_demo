import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App.tsx'
import { fetchMemoById } from '../persistance/sqliteStorage'
import CustomNavigationBar from './components/CustomNavigationBar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type MemoScreenProp = NativeStackScreenProps<RootStackParamList, 'Memo'>

export default function MemoScreen({ navigation, route }: MemoScreenProp) {
  const { id } = route.params;
  const [memo, setMemo] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemo = async () => {
      const fetchedMemo = await fetchMemoById(id); // 비동기 호출
      setMemo(fetchedMemo); // 상태 업데이트
    };

    fetchMemo();
  }, [id]);

  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <SafeAreaProvider>
      <Container style={styles.container}>
        <CustomNavigationBar
          title={'Memo'}
          isBack={true}
          
        />
        <View style={styles.contents}>
          <Text>메모 정보</Text>
          <Text>{memo || '로딩 중...'}</Text>
        </View>
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 25 : 0,

  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
