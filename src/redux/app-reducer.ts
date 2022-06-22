import { Dispatch } from 'redux';
//import { authAPI, usersAPI } from '../api/api'

import { ThunkAction } from 'redux-thunk';
import internal from 'stream';
import { headerLoginProfileThunk } from './auth-reducer.ts';
import { AppStateType, InferActionsTypes } from './redux-store';

//const INITIALIZED_SUCCES = 'SN/APP/INITIALIZED_SUCCES';   //метод наименования редакс дак, для предотвращения конфликтов названий экшнов

const initialState = {
    initialized: false
}
export type InitialStateReducerType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateReducerType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCES':
            return {
                ...state,
                initialized: true 
            }
        default:
            return state
    }
}
 
 export const actions = {
    setInitializedSucces: () => {
        return { type: 'SN/APP/INITIALIZED_SUCCES' } as const
}
}
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializedSuccesActionType>
export const initializeThunk = () => {
    return (dispatch) => {
        let promise = dispatch(headerLoginProfileThunk())
        Promise.all([promise])
        .then( () => {   ///когда все промисы зарезолвятся то диспатчим succes экшн криейтор
            dispatch(actions.setInitializedSucces())
        })
       
    }
}


export default appReducer;