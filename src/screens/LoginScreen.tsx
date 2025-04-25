import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { load, save } from '../persistance/asyncStorage';
import { withDelay } from 'react-native-reanimated';
import { LoginScreenStyles } from './styles/LoginScreenStyles';


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

      {/* 입력 필드 */}
      <TextInput
        placeholder="Email address"
        placeholderTextColor="#A9A9A9"
        value={id}
        onChangeText={setId}
        style={LoginScreenStyles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={LoginScreenStyles.input}
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={LoginScreenStyles.loginButton}
        onPress={handleLogin}
      >
        <Text style={LoginScreenStyles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* 하단 링크 */}
      <View style={LoginScreenStyles.footer}>
        <TouchableOpacity>
          <Text style={LoginScreenStyles.footerText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={LoginScreenStyles.footerText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}