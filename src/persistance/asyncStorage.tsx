import AsyncStorage from '@react-native-async-storage/async-storage'

type MyAsyncStorageType = {
    save: (key: string, value: string) => Promise<void>;
    load: (key: string) => Promise<string>
}

export const MyAsyncStorage: MyAsyncStorageType = {
    save: async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value)
            console.log(`[AsyncStorage] ${key}: <-`, value)
        } catch (e) {
            console.error(`[AsyncStorage] ${key} 저장 실패:`, e)
            throw e
        }
    },
    load: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                console.log(`[AsyncStorage] ${key}: `, value)
                return value
            } else {
                throw new Error('[AsyncStorage] 저장된 값이 없습니다.')
            }
        } catch (e) {
            console.error(`[AsyncStorage] ${key} 읽기 실패:`, e)
            throw e
        }
    }
}
