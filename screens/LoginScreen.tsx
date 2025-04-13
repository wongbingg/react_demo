import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    const handleLogin = () => {
        if (id && pw) {
            navigation.navigate('Home')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='ID'
                value={id}
                onChangeText={setId}
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                value={pw}
                onChangeText={setPw}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: {borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5},
})