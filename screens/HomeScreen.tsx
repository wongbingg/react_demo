import React, { useState } from 'react';
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
import { RootState, AppDispatch } from '../redux/store'
import { incrementByAmount } from '../redux/counterSlice';
import { increment } from '../redux/onePlusSlice'
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from './components/CustomAlert';
import HomeScreenStyles from './styles/HomeScreenStyles';
import { save } from '../storage';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { MyNativeModule } = NativeModules;

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={HomeScreenStyles.stretchedItem}>
    <Text>{title}</Text>
  </View>
);

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const count = useSelector((state: RootState) => state.counter.value)
  const count2 = useSelector((state: RootState) => state.onePlus.value)
  const dispatch = useDispatch<AppDispatch>()
 
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

  const memos = [
    { id: '1', text: '첫 번째 메모' },
    { id: '2', text: '두 번째 메모' },
    { id: '3', text: '세 번째 메모1212113' },
    // 필요한 만큼 추가
  ];

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
            ({ item }) => <Item title={item.text} />
          }
          keyExtractor={item => item.id} />

        {/* 새로운 메모 생성 버튼 */}
        <TouchableOpacity style={HomeScreenStyles.floatingButton} onPress={goToWrite}>
          <Text style={HomeScreenStyles.floatingButtonText}>+</Text>
        </TouchableOpacity>

        {/* 로그아웃 얼럿 */}
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onConfirm={handleLogoutConfirm}/>
      </Container>
    </SafeAreaProvider>
  )
}