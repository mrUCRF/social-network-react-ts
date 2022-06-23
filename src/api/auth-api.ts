import { APIResponseType, instatnse, ResultCodeForCapcthaEnum, ResultCodesEnum } from "./api"


type getAuthDataResponseType = {
        id: number
        email: string
        login: string
}
type loginResponseDataType = {
        userId: number
}
type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    getAuthData() {
        return instatnse.get<APIResponseType<MeResponseDataType>>(`auth/me`).then((response) => {
            return response.data
        });
    },
    login (email: string, password: string, rememberMe = false , captcha: null | string = null)  {
        return instatnse.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCapcthaEnum>>(`auth/login`, { email, password, rememberMe, captcha }).then((response => {
            return response.data
        }))
    },
    logout() {
        return instatnse.delete(`auth/login`).then((response => {
            return response.data
        }))
    }
} 
