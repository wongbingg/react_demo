import axios from 'axios';
import { LoginPhonePassword_Res, LoginValidate_Res, Register_Res } from './authRepository';
import { MyAsyncStorage } from '../persistance/asyncStorage';
import Config from 'react-native-config'

const axiosInstance = axios.create({
    baseURL: Config.BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'autocrypt-client-id': Config.AUTOCRYPT_CLIENT_ID,
        'autocrypt-service-id': Config.AUTOCRYPT_SERVICE_ID,
        'ams-authorization': Config.AMS_AUTHORIZATION,
        'App-Id': Config.APP_ID,
    },
})

axiosInstance.interceptors.request.use(
   async (config) => {
        console.log('Request URL:', (config.baseURL || 'NO BASEURL') + config.url)
        console.log('Request Headers:', config.headers);
        console.log('Request Body:', config.data);

        try {
            const accessToken = await MyAsyncStorage.load('ACCESS_TOKEN')
            if (accessToken) {
                config.headers['Access-Token'] = `${accessToken}`
            }
        } catch (error) {
            console.error('AccessToken이 존재하지 않습니다.')
        }

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response Data:', response.data);

        const data = response.data;

        if (isRegisterRes(data) || isLoginvalidateRes(data) || isLoginPhonePasswordRes(data)) {
            const accessToken = data.user!.accessToken!;
            const id = data.user!.id!;

            MyAsyncStorage.save('ACCESS_TOKEN', accessToken);
            MyAsyncStorage.save('USER_ID', id);

            console.log('Access Token Assigned:', accessToken)
            console.log('User ID Assigned:', id)
        }

        return response;
    },
    (error) => {
        console.error('Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
)

function isRegisterRes(data: any): data is Register_Res {
    return (data?.user?.accessToken !== undefined) && (data?.user?.id !== undefined);
}

function isLoginvalidateRes(data: any): data is LoginValidate_Res {
    return (data?.user?.accessToken !== undefined) && (data?.user?.id !== undefined);
}

function isLoginPhonePasswordRes(data: any): data is LoginPhonePassword_Res {
    return (data?.user?.accessToken !== undefined) && (data?.user?.id !== undefined);
}

export default axiosInstance