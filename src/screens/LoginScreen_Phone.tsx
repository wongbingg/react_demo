import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import CustomNavigationBar from './components/CustomNavigationBar'
import { AuthRepository } from '../network/authRepository'
import { MyAsyncStorage } from '../persistance/asyncStorage'

type LoginScreen_PhoneProp = NativeStackScreenProps<RootStackParamList, 'Login_Phone'>

export default function LoginScreen_Phone({ navigation }: LoginScreen_PhoneProp) {

    const [inputNumber, setInputNumber] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const handleNextButton = async () => {
        try {
            const res = await AuthRepository.login({phoneNo: inputNumber, password: inputPassword, token: 'empty'})
            if (res.code === 0) {
                console.log('로그인 성공')
                MyAsyncStorage.save('IS_LOGIN', 'Y')
                navigation.goBack();
            } else {
                console.error('로그인 실패', res.msg)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSendButton = () => {
        AuthRepository.sendCode({ phoneNo: inputNumber })
    }

    const formatPhoneNumber = (phone: string) => {
        const cleaned = phone.replace(/[^0-9]/g, '');

        if (cleaned.length <= 3) {
            return cleaned;
        } else if (cleaned.length <= 7) {
            return `${cleaned.slice(0,3)}-${cleaned.slice(3)}`;
        } else {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
        }
    }

    return (
        <View style={styles.container}>
            {/* 네비게이션바 */}
            <CustomNavigationBar
                title={'로그인'}
                isBack={true}
            />

            <Text
                style={{
                    padding: 20,
                    marginTop: 40,
                }}
            >
                전화번호를 입력해주세요.
            </Text>
            <View
                style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
            >
                <TextInput
                    placeholder='전화번호 입력'
                    style={styles.textInput}
                    keyboardType='numeric'
                    onChangeText={(text) => setInputNumber(formatPhoneNumber(text))}
                    value={inputNumber}
                />
                <Button
                    title="보내기"
                    onPress={handleSendButton}
                />
            </View>
            <TextInput
                placeholder='비밀번호 입력'
                style={styles.textInput}
                onChangeText={setInputPassword}
            />
            <View style={{ flex: 1 }} />

            <Button
                title="다음"
                disabled={false}
                onPress={handleNextButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    textInput: {
        fontSize: 20,
        marginLeft: 20,
        width: '70%',
        borderBottomWidth: 1, // Underline 두께
        borderBottomColor: '#000', // Underline 색상
        marginVertical: 10, // 간격 추가
        padding: 5, // 텍스트 입력 패딩
    },
})
