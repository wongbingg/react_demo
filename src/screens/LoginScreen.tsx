import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App.tsx';
import { MyAsyncStorage } from '../persistance/asyncStorage';
import { withDelay } from 'react-native-reanimated';
import { LoginScreenStyles } from './styles/LoginScreenStyles';
import { AuthRepository } from '../network/authRepository.ts';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProp) {
  const [isLoading, setIsLoading] = useState(true);

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handlePhoneLogin = () => {
    navigation.navigate('Login_Phone')
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLogin = await MyAsyncStorage.load('IS_LOGIN') // 비동기 호출
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
      <View style={LoginScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FF7F" />
        <Text style={LoginScreenStyles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={LoginScreenStyles.container}>

      {/* 로고 */}
      <Image
        source={require('../assets/logo.png')} // 로고 이미지 경로
        style={LoginScreenStyles.logo}
      />

      {/* 전화번호로 로그인 버튼 */}
      <TouchableOpacity
        style={LoginScreenStyles.loginButton}
        onPress={handlePhoneLogin}
      >
        <Text style={LoginScreenStyles.loginButtonText}>전화번호로 로그인하기</Text>
      </TouchableOpacity>

      {/* 하단 링크 */}
      <View style={LoginScreenStyles.footer}>
        <TouchableOpacity
          onPress={handleSignUp}
        >
          <Text style={LoginScreenStyles.footerText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={LoginScreenStyles.footerText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}