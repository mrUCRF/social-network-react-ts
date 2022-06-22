import { photosType, profileType, UsersType } from './../types/types';
import axios from "axios";
import { ProfileDataType } from "../types/types";

export const instatnse = axios.create({     ///настройка аксиос
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: { "API-KEY": "43ab35d3-a913-4ff3-b373-4c376aa7e8b5" },
})

export enum ResultCodeCaptchaReqired {
    CaptchaIsRequired = 10
}
export enum ResulCodeEnum {
Succes = 0,
Error = 1,
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type ResponseType<D = {}, RC = ResulCodeEnum> = {    //дженерик тип который нужно уточнять - общий тип для респонсов с сервера
    data: D
    messages: Array<string>
    resultCode: RC
}
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResulCodeEnum
    messages: Array<string>
}
