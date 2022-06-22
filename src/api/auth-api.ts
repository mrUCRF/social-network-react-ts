import { instatnse, ResulCodeEnum, ResultCodeCaptchaReqired } from "./api.ts"
import { ResponseType } from "./api"

type getAuthDataResponseType = {
        id: number
        email: string
        login: string
}
type loginResponseDataType = {
        userId: number
}


export const authAPI = {
    getAuthData() {
        return instatnse.get<ResponseType<getAuthDataResponseType, ResulCodeEnum | ResultCodeCaptchaReqired>>(`auth/me`).then((response) => {
            return response.data
        });
    },
    login (email: string, password: string, rememberMe = false , captcha: null | string = null)  {
        return instatnse.post<ResponseType<loginResponseDataType>>(`auth/login`, { email, password, rememberMe, captcha }).then((response => {
            return response.data
        }))
    },
    logout() {
        return instatnse.delete(`auth/login`).then((response => {
            return response.data
        }))
    }
} 
