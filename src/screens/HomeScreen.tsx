import React, { useState, useEffect, useCallback, memo, StrictMode } from 'react';
import {
  View,
  Button,
  Text,
  BackHandler,
  Platform,
  TouchableOpacity,
  NativeModules,
  FlatList,
  StyleSheet,
  Pressable,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App.tsx';
import CustomAlert from './components/CustomAlert';
import HomeScreenStyles from './styles/HomeScreenStyles';
import { save } from '../persistance/asyncStorage';
import { createSqlTable, deleteMemoById, fetchMemos } from '../persistance/sqliteStorage';
import { MemoCell } from './components/MemoCell';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { homeSlice } from '../redux/homeSlice';
import CustomNavigationBar from './components/CustomNavigationBar';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { MyNativeModule } = NativeModules;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const dispatch = useDispatch()
  const memosValue = useSelector((state: RootState) => state.home.memos) // why; 바인딩이 된건가 ?
  const handleMemosChange = (value: { id: string, text: string }[]) => {
    dispatch(homeSlice.actions.setMemos(value))
  }

  const fetchData = async () => { // todo; 바인딩 됨. 이것을 바인딩 목록으로 쭉 나열하면 될듯
    try {
      const memos = await fetchMemos();
      handleMemosChange(memos || []);
    } catch (error) {
      console.error('Failed to fetch memos:', error);
    }
  }

  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    createSqlTable();
  })

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; }) // 뒤로가기 무시
      return () => backHandler.remove();
    }, [])
  );

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

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, id: string) {
    const styleAnimation = useAnimatedStyle(() => {
      console.log('showRightProgress:', prog.value);
      console.log('appliedTranslation:', drag.value);

      return {
        transform: [{ translateX: drag.value + 100 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <Pressable
          onPress={async () => {
            await deleteMemoById(id);
            await fetchData();
          }
          }
        >
          <Text style={styles.rightAction}>삭제</Text>
        </Pressable>
      </Reanimated.View>
    );
  }

  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <SafeAreaProvider>
      <Container style={HomeScreenStyles.container}>

        {/* 네비게이션바 */}
        <CustomNavigationBar
          title={'Home'}
          isBack={false}
          rightButton={{
            text: '로그아웃',
            handler: handleLogout
          }}
        />

        {/* 메인 리스트 */}
        <GestureHandlerRootView>
          <FlatList
            data={memosValue}
            renderItem={
              ({ item }) =>
                <ReanimatedSwipeable
                  containerStyle={styles.swipeable}
                  friction={4}
                  enableTrackpadTwoFingerGesture
                  rightThreshold={50}
                  renderRightActions={(prog, drag) => RightAction(prog, drag, item.id)}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Memo', { id: item.id })}
                  >
                    <MemoCell title={item.text} />
                  </TouchableOpacity>
                </ReanimatedSwipeable>
            }
            keyExtractor={item => item.id}
          />
        </GestureHandlerRootView>

        {/* 새로운 메모 생성 버튼 */}
        <TouchableOpacity style={HomeScreenStyles.floatingButton} onPress={goToWrite}>
          <Text style={HomeScreenStyles.floatingButtonText}>+</Text>
        </TouchableOpacity>

        {/* 로그아웃 얼럿 */}
        <View>
          <CustomAlert
            visible={isAlertVisible}
            onClose={() => setAlertVisible(false)}
            onConfirm={handleLogoutConfirm}
          />
        </View>
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  rightAction: {
    width: 100,
    height: 60,
    marginVertical: 8,
    backgroundColor: 'red',
    textAlign: 'center',
    textAlignVertical: "center",
    color: 'white',
    fontWeight: '800'
  },
  swipeable: {
    // height: 80,
    // backgroundColor: 'papayawhip',
  },
});