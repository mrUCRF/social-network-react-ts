import { photosType, ProfileDataType, profileType } from "../types/types"
import { instatnse, ResulCodeEnum, ResponseType } from "./api.ts"

export const profileAPI = {
    getUserProfileData(userId: number) {
        return instatnse.get<profileType>(`profile/${userId}`).then(res => res.data)  //получение данных выбранного юзера
    },
    getStatus(userId: number) {

        return instatnse.get<string>(`profile/status/${userId}`).then((response) => {
            return response.data
        }) //запрос на получение статуса с апи
    },
    updateStatus(status: string) {
        return instatnse.put<ResponseType>(`profile/status`, { status: status }).then(res => res.data)  //изменение статуса с инпута в апи
    },
    savePhoto(file: string) {
        let formData = new FormData()
        formData.append("image", file)
        return instatnse.put<ResponseType<photosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data.data
        })
    },
    saveProfileData(data: ProfileDataType) {
        return instatnse.put<ResponseType>(`profile`, data).then(res => res.data)
    }
}