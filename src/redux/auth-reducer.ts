import { ThunkAction } from 'redux-thunk';
import { number } from 'yup';
import {ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //сюда запрашивается и помещается юрл картинки капчи (если она есть)
}
export type initialStateAuthType = typeof initialState

const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'sn/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.data,


            }
        case 'sn/auth/GET_CAPTCHA_URL_SUCCES': {
            return {
                ...state,
                captchaUrl: action.payload.url
            }
        }

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null) => {
        return { type: 'sn/auth/SET_USER_DATA', data: { userId, email, login, isAuth, captchaUrl } } as const
    },
    getCaptchaUrlSucces: (url: string) => {
        return { type: 'sn/auth/GET_CAPTCHA_URL_SUCCES', payload: { url } } as const
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType> // прописываем тип ошибок redux-form : ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

export const headerLoginProfileThunk = (): ThunkType => { //рефакторинг с помощью async await
        return async (dispatch) => {
            let responseData = await authAPI.getAuthData()
            if (responseData.resultCode === ResultCodesEnum.Success) {
                let { id, email, login } = responseData.data
                dispatch(actions.setAuthUserData(id, email, login, true, '')) //заполняем данными локальный стейт с апи
            }
        }
    }
export const loginThunk = (email: string, password: string, rememberMe: boolean, captchaUrl: string): ThunkType => {  //делаем запрос с задаными на авторизацию и диспатчим обновление данных с апи в стейт
        return async (dispatch) => {
            let data = await authAPI.login(email, password, rememberMe, captchaUrl)
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(headerLoginProfileThunk())   //если получилось залогинится, то диспатчим санку с прогрузкой моих данных
            } else {
                if (data.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
                    dispatch(getCaptchaUrlThunk())
                    alert(data.messages)
                } else {
                    alert(data.messages)
                }
            }
        }
    }
export const getCaptchaUrlThunk = (): ThunkType => {
        return async (dispatch) => {
            const dataUrl = await securityAPI.getCaptchaURL()
            dispatch(actions.getCaptchaUrlSucces(dataUrl))
        }
    }

export const logoutThunk = (): ThunkType => { //делаем зачистку 
        return async (dispatch) => {
            let data = await authAPI.logout()
            if (data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false, null))
            }
        }
    }



export default authReducer;