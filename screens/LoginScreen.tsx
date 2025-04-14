import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function LoginScreen({ navigation }: LoginScreenProp) {
    // const navigation = useNavigation<LoginScreenNavigationProp>()
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    const handleLogin = () => {
        if (id && pw) {
            navigation.navigate('Home', { id: id })
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