import React, { useCallback } from 'react'
import {
  View, Button, Text, StyleSheet, BackHandler, Alert,
  ScrollView, ImageBackground, Animated, useWindowDimensions, useAnimatedValue,
  Platform,
} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const images = new Array(6).fill(
  // 'https://images.unsplash.com/photo-1673678886475-3a2f8c5d0b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4'
);
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const scrollX = useAnimatedValue(0);

  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; }) // 뒤로가기 무시
      return () => backHandler.remove();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: '확인',
          onPress: () => handleLogoutConfirm()
        }
      ]
    )
  }

  const handleLogoutConfirm = () => {
    Alert.alert('로그아웃 되었습니다.')
    navigation.goBack()
  }

  const handleProfile = () => {
    navigation.navigate('Profile')
  }

  const { id } = route.params;

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

  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <SafeAreaProvider>
      <Container style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX }
                  }
                }
              ])}
            scrollEventThrottle={1}>
            {images.map((image, index) => {
              return (
                <View
                  style={{ width: windowWidth, height: 250 }}
                  key={index}>
                  <ImageBackground source={{ uri: image }} style={styles.card}>
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>
                        {'Image - ' + index}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {images.map((image, index) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (index - 1),
                  windowWidth * index,
                  windowWidth * (index + 1)
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={index}
                  style={[styles.normalDot, { width }]}
                />
              );
            })}
          </View>

          {/* <View style={styles.container}>
            <Text>안녕하세요, {id} 님</Text>
            <Button title="Profile" onPress={handleProfile} />
          </View> */}
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            title="Go to Profile"
            onPress={handleProfile} />
        </View>
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
