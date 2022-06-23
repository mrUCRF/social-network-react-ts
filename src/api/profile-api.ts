import { photosType, ProfileDataType, profileType } from "../types/types"
import { instatnse, APIResponseType } from "./api"
type SavePhotoResponseDataType = {
    photos: photosType
}
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
        return instatnse.put<APIResponseType>(`profile/status`, { status: status }).then(res => res.data)  //изменение статуса с инпута в апи
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        return instatnse.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        })
    },
    saveProfileData(data: ProfileDataType) {
        return instatnse.put<APIResponseType>(`profile`, data).then(res => res.data)
    }
}