import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { fetchMemoById } from '../persistance/SQLiteStorage'

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

  return (
    <View style={styles.container}>
      <Text>메모 정보</Text>
      <Text>{memo || '로딩 중...'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
