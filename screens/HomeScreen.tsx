import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  View,
  Button,
  Text,
  BackHandler,
  Platform,
  TouchableOpacity,
  NativeModules,
  FlatList
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomAlert from './components/CustomAlert';
import HomeScreenStyles from './styles/HomeScreenStyles';
import { save } from '../persistance/asyncStorage';
import { createSqlTable, fetchMemos } from '../persistance/sqliteStorage';
import { MemoCell } from './components/MemoCell';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { MyNativeModule } = NativeModules;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [memos, setMemos] = useState<{ id: string; text: string }[]>([]);
  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    createSqlTable();
  })

  useFocusEffect(
    useCallback(() => {
      fetchMemos().then((res) => setMemos(res || []))
    }, [])
  )

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; }) // 뒤로가기 무시
      return () => backHandler.remove();
    }, [])
  );
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleLogout}
          title="Logout"
        />
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    setAlertVisible(true);
  }

  const handleLogoutConfirm = () => {
    setAlertVisible(false);
    save('IS_LOGIN', 'N')
    navigation.goBack()
  }

  const goToWrite = () => {
    navigation.navigate('Write')
  }

  const handleTest = () => { // why; Native Module Test
    MyNativeModule.showToast('Hello from React!!!');
  }

  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <SafeAreaProvider>
      <Container style={HomeScreenStyles.container}>
        {/* 메인 리스트 */}
        <FlatList
          data={memos}
          renderItem={
            ({ item }) => 
              <TouchableOpacity
                onPress={() => navigation.navigate('Memo', { id: item.id })}
              >
                <MemoCell title={item.text} />
              </TouchableOpacity>
          }
          keyExtractor={item => item.id}
        />

        {/* 새로운 메모 생성 버튼 */}
        <TouchableOpacity style={HomeScreenStyles.floatingButton} onPress={goToWrite}>
          <Text style={HomeScreenStyles.floatingButtonText}>+</Text>
        </TouchableOpacity>

        {/* 로그아웃 얼럿 */}
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onConfirm={handleLogoutConfirm} />
      </Container>
    </SafeAreaProvider>
  )
}