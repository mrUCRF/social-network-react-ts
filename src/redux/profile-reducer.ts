
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { string } from "yup";
import { profileAPI } from "../api/profile-api.ts";

import { contactsType, initialStatePostType, photosType, profileType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux-store";


const initialState = {
    profilePostData: [
        { id: 1, messagePost: 'my first post', likeCount: 54 },
        { id: 2, messagePost: 'my second post', likeCount: 34 },
    ] as Array<initialStatePostType>,
    newPostText: 'first text',
    profile: null as profileType | null,
    status: ''
}

export type initialStateProfileType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): initialStateProfileType => {
    switch (action.type) {
        case 'sn/profile/ADD-POST': {
            const newPost: initialStatePostType = {
                id: 5,
                messagePost: state.newPostText,
                likeCount: 15 + "likes"
            };
            let stateCopy = { ...state }
            stateCopy.profilePostData = [...state.profilePostData]
            stateCopy.profilePostData.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy
        }
        case 'sn/profile/UPDATE-NEW-POST': {
            let stateCopy = { ...state }
            //stateCopy.newPostText = [...state.newPostText]   
            stateCopy.newPostText = action.newText;
            return stateCopy
        }
        case 'sn/profile/SET_USERS_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'sn/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'sn/profile/DELETE_POST': {
            return {
                ...state,
                profilePostData: state.profilePostData.filter((p) => { // оставляем посты тех айди, которые не пришли в экшене
                    return p.id !== action.postId
                })
            }
        }
        case 'sn/profile/UPDATE_PROFILE_PHOTO': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo } as profileType
            }
        }
        // case SAVE_PROFILE_DATA: {
        //     return {

        //     }
        // }
        default:
            return state

    }
}
type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    deletePostAC: (postId: number) => {
        return { type: 'sn/profile/DELETE_POST', postId } as const
},
setUsersProfile: (profile: profileType) => { 
    return { type: 'sn/profile/SET_USERS_PROFILE', profile } as const
},
btnAddPostActionCreator: () => {
    return { type: 'sn/profile/ADD-POST' } as const
},
onPostChangeActionCreator: (text: string) => {
    return { type: 'sn/profile/UPDATE-NEW-POST', newText: text } as const
},
setStatus: (status: string) => {
    return { type: 'sn/profile/SET_STATUS', status } as const
},
savePhotoSucces: (photo: photosType) => {
    return { type: 'sn/profile/UPDATE_PROFILE_PHOTO', photo } as const
},
getSaveProfileData: () => {
    return { type: 'sn/profile/SAVE_PROFILE_DATA' } as const
}
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUserDataThunk = (userId: number): ThunkType => {  //это санки
    return async (dispatch) => {
        let data = await profileAPI.getUserProfileData(userId)
        dispatch(actions.setUsersProfile(data))
    }
}
export const getUserStatusThunk = (userId: number): ThunkType => { // здесь передаем айди и делаем гет запрос айдишника, и диспатчим его статус в стейт
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    }
}
export const updateUserStatusThunk = (status: string): ThunkType => { // санка берет сообщение статуса, делает put запрос с передачей текста статуса, 
    //и диспатчит его в сет статус
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    }
}
export const savePhotoThunk = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        dispatch(actions.savePhotoSucces(data.photos))
    }
}


type saveProfileDataThunkPropetryType = {
    aboutMe: string | null
    contacts: contactsType
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
}

export const saveProfileDataThunk = (dataProfile: saveProfileDataThunkPropetryType): ThunkType => {
    return async (dispatch, getState) => {   //из глобального стейта доставли метод гетСтейт и взяли наш авторизованый айдишник
        const userId = getState().auth.userId
        let data = await profileAPI.saveProfileData(dataProfile)
        if (data.resultCode === 0) {
            if (userId !== null) {
                dispatch(getUserDataThunk(userId))
            } else {
                throw new Error("user ID can't be null") 
            }
        } else {
            alert(data.messages)
            return Promise.reject(data.messages)
        }
    }

}

export default profileReducer;