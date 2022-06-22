import { instatnse } from "./api.ts"

type getCaptchaURLType = {
    url: string
    }

export const securityAPI = {
    getCaptchaURL() {
        return instatnse.get<getCaptchaURLType>(`security/get-captcha-url`).then((response) => {
            return response.data.url
        })
    }
}