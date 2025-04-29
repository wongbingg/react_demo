import { API_PATHS } from "./apiPaths"
import axiosInstance from "./axiosInstance"
import { BaseResponse } from "./baseResponse"

type AuthRepositoryType = {
    login: (reqBody: LoginPhonePassword_Req) => Promise<LoginPhonePassword_Res>,
    loginValidate: (reqBody: LoginValidate_Req) => Promise<LoginValidate_Res>,
    sendCode: (reqBody: SendCode_Req) => Promise<void>,
    verifyCode: (reqBody: VerifyCode_Req) => Promise<void>,
    registerMOnWithTerms: (reqBody: RegisterMon_Req) => Promise<Register_Res>
    fetchTermsList: () => Promise<void>
    logout: (reqBody: Logout_Req) => Promise<Logout_Res>
    appConfig: () => Promise<AppConfig_Res>
}

export const AuthRepository: AuthRepositoryType = {
    login: async (reqBody: LoginPhonePassword_Req): Promise<LoginPhonePassword_Res> => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.LOGIN_PHONE_PASSWORD,
                reqBody
            )
            return response.data
        } catch (error) {
            throw error;
        }
    },
    fetchTermsList: async (): Promise<void> => {
        const response = await axiosInstance.post(
            API_PATHS.TERMS_LIST
        )
        return response.data
    },
    loginValidate: async (reqBody: LoginValidate_Req): Promise<LoginValidate_Res> => {
        const response = await axiosInstance.post(
            API_PATHS.LOGIN_VALIDATE,
            reqBody
        )
        return response.data
    },
    sendCode: async (reqBody: SendCode_Req): Promise<void> => {
        const response = await axiosInstance.post(
            API_PATHS.SEND_CODE,
            reqBody
        )
        console.log(response.data)
        return response.data
    },
    verifyCode: async (reqBody: VerifyCode_Req): Promise<void> => {
        const response = await axiosInstance.post(
            API_PATHS.VERIFY_CODE,
            reqBody
        )
        return response.data
    },
    registerMOnWithTerms: async (reqBody: RegisterMon_Req): Promise<Register_Res> => { // accessToken
        const response = await axiosInstance.post(
            API_PATHS.REGISTER_M_ON_WITH_TERMS,
            reqBody
        )
        return response.data
    },
    logout: async (reqBody: Logout_Req): Promise<Logout_Res> => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.LOGOUT,
                reqBody
            )
            return response.data
        } catch (error) {
            throw error;
        }
    },
    appConfig: async (): Promise<AppConfig_Res> => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.APP_CONFIG
            )
            return response.data
        } catch (error) {
            throw error;
        }
    }
}

export interface LoginPhonePassword_Res extends BaseResponse {
    user?: User
    approveState?: Configs
}

export interface LoginValidate_Res extends BaseResponse {
    groupExpiredFlag?: boolean
    user?: User
    approveState?: Configs
}

interface Logout_Res extends BaseResponse { }

interface AppConfig_Res extends BaseResponse {
    appConfig?: Config
}

export interface Register_Res extends BaseResponse {
    msg?: string
    code?: number
    user?: User
    approveState?: Configs
    moffMemberIds?: [string]
    groupExpiredFlag?: boolean
}

type User = {
    accessToken?: string
    active?: string,
    address?: string,
    addressDetails?: string
    addressLat?: number,
    addressLng?: number
    birth?: string
    canceledCount?: number
    centerId?: string,
    created?: string,
    customerType?: Configs
    email?: string,
    familyNo?: string,
    familyNo2Nd?: string,
    familyNo3RD?: string,
    familyRelation?: string,
    familyRelation2Nd?: string,
    familyRelation3RD?: string,
    gender?: string,
    id?: string,
    mobileNo?: string,
    name?: string,
    password?: string,
    registerType?: string,
    state?: string,
    updated?: string,
    usedCount?: number,
    userCanceledCount?: number
}

type Configs = {
    configKey?: string
    configName?: string
    configValue?: string
}

type Config = {
    appType?: string
    created?: string
    gpsCycle?: number
    id?: string
    latestVersion?: string
    minVersion?: string
    updateCycle?: number
    updated?: string
}

type Logout_Req = {
    userId: string
}

type LoginPhonePassword_Req = {
    phoneNo: string
    password: string
    token: string
}

type LoginValidate_Req = {
    accessToken: string,
    token: string
}

type SendCode_Req = {
    phoneNo: string
}

type VerifyCode_Req = {
    phoneNo: string,
    verifyCode: string
}

export type RegisterMon_Req = {
    registerMOn: RegisterMon,
    termsHistoryItems: TermsHistoryItem[]
}

export type RegisterMon = {
    address: string,
    addressDetail: string,
    birth: string,
    email: string,
    expectedDeliveryDate: string,
    familyName: string,
    familyNo: string,
    gender: string,
    groupCode: string,
    groupMemo: string,
    groupName: string,
    name: string,
    phoneNo: string,
    pw: string,
    token: string,
    type: string,
    typeMemo: string,
    mOffMembers?: [OffMember]
}

type OffMember = {
    address: string,
    addressDetail: string,
    birth: string,
    gender: string,
    groupCode: string,
    name: string
}

export type TermsHistoryItem = {
    agreement: boolean,
    termsId: string
}