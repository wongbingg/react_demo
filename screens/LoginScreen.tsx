import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { load, save } from '../storage';
import { withDelay } from 'react-native-reanimated';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProp) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = () => {
    if (id && pw) {
      navigation.navigate('Home');
      save('IS_LOGIN', "Y")
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLogin = await load('IS_LOGIN') // 비동기 호출
        if (isLogin === "Y") {
          await delay(800);
          navigation.navigate('Home');
        } else {
          console.debug('로그아웃 상태')
        }
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error)
      } finally {
        setIsLoading(false);
      }
    }

    checkLoginStatus()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FF7F" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image
        source={require('../assets/logo.png')} // 로고 이미지 경로
        style={styles.logo}
      />
      {/* 입력 필드 */}
      <TextInput
        placeholder="Email address"
        placeholderTextColor="#A9A9A9"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
      />
      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      {/* 하단 링크 */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004225', // 배경색 (녹색 계열)
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00FF7F', // 밝은 녹색
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#013220', // 어두운 녹색
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#FFFFFF', // 텍스트 색상
    fontSize: 16,
    elevation: 5, // 입체감 추가
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 4, // 그림자 반경
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#00FF7F', // 밝은 녹색
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 5, // 입체감 추가
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 4, // 그림자 반경
  },
  loginButtonText: {
    color: '#004225', // 어두운 녹색
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  footerText: {
    color: '#A9A9A9', // 회색
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004225',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
});