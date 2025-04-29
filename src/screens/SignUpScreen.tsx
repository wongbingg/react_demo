import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import CustomNavigationBar from './components/CustomNavigationBar'
import { AuthRepository, RegisterMon_Req, TermsHistoryItem } from '../network/authRepository'

type SignUpScreenProp = NativeStackScreenProps<RootStackParamList, 'SignUp'>

export default function SignUpScreen({ navigation }: SignUpScreenProp) {

    const [inputNumber, setInputNumber] = useState('')
    const [password, setPassword] = useState('')

    const handleNextButton = () => {
        const termsHistoryItems: TermsHistoryItem[] = [
            {
                agreement: true,
                termsId: '4NiTuD0UQxaLcm5JhNo-zg'
            },
            {
                agreement: true,
                termsId: 'jYK5AXYVTKecojWHDXgT1Q'
            },
            {
                agreement: true,
                termsId: 'nGpMCEQwTe2hWnele3rQpw'
            }
        ]
        const req: RegisterMon_Req = {
            registerMOn: {
                address: '서울 영등포구 여의공원로 115',
                addressDetail: '아우토크립트',
                birth: '961119',
                email: 'test@gmail.com',
                expectedDeliveryDate: '2025-04-29',
                familyName: '',
                familyNo: '',
                gender: '1',
                groupCode: '',
                groupMemo: '',
                groupName: '이원빈 님의 가족 그룹',
                name: '이원빈',
                phoneNo: '010-3856-8436',
                pw: password,
                token: 'empty',
                type: '일반',
                typeMemo: '',
            },
            termsHistoryItems: termsHistoryItems
        }
        try {
            const res = AuthRepository.registerMOnWithTerms(req);
            navigation.goBack();
        } catch (error) {
            Alert.alert('회원가입 실패했습니다. 다시 시도해주세요.');
        }
    }

    const handleSendButton = () => {
        AuthRepository.sendCode({ phoneNo: inputNumber })
    }

    return (
        <View style={styles.container}>
            {/* 네비게이션바 */}
            <CustomNavigationBar
                title={'회원가입'}
                isBack={true}
            />

            <Text style={{ padding: 20, marginTop: 10, }}>
                가입과정 단축하여 한번에 진행
            </Text>

            <TextInput
                placeholder='전화번호 입력'
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={setInputNumber}
            />
            <TextInput
                placeholder='비밀번호 입력'
                style={styles.textInput}
                onChangeText={setPassword}
            />

            <View style={{ flex: 1 }} />

            <Button
                title="가입"
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
