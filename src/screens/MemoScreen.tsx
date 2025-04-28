import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App.tsx'
import CustomNavigationBar from './components/CustomNavigationBar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Memo } from '../types/memo.ts'
import { MemoStorage } from '../persistance/memoStorage.ts'

type MemoScreenProp = NativeStackScreenProps<RootStackParamList, 'Memo'>

export default function MemoScreen({ navigation, route }: MemoScreenProp) {
  const { id } = route.params;
  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    const fetchMemo = async () => {
      const fetchedMemo = await MemoStorage.readMemoById(id); // 비동기 호출
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
          <Text>{memo?.title}</Text>
          <Text>{memo?.body}</Text>
          <Text>{memo?.ref}</Text>
        </View>
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
