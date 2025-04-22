import AsyncStorage from '@react-native-async-storage/async-storage'

export const save = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log('저장완료')
    } catch (e) {
        console.error('저장 실패:', e)
    }
}

export const load = async (key: string): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            console.log('이미 로그인했는지:', value)
            return value
        } else {
            throw new Error('저장된 값이 없습니다.')
        }
    } catch (e) {
        console.error('읽기 실패:', e)
        throw e
    }
}