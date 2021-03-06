//import { setCurrentPage } from './users-reducer';
import {  UsersType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { usersAPI } from "../api/users-api";

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS'
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
// const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 50 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, //array of usersID
    portionSize: 10 as number,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type initialStateUsersType = typeof initialState
export type FilterType = typeof initialState.filter
const usersReducer = (state = initialState, action: ActionsType): initialStateUsersType => {
    switch (action.type) {
        case 'sn/users/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u
                })
            }
        case 'sn/users/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u
                })
            }
        case 'sn/users/SET_USERS':
            //return { ...state, users: [...action.users]}
            return { ...state, users: action.users }
        case 'sn/users/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'sn/users/SET_TOTAL_COUNT':
            return { ...state, totalUsersCount: action.count }
        case 'sn/users/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'sn/users/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching //?? ???????????????????? ?????? ???????????? ???????????? changeSubscriptionStatus isFetching ???????????????????? true
                    ? [...state.followingInProgress, action.id] // ?? ???????????? followingInProgress ???????????????????? id usera ???? ???????????????? ???????????????? ????????????????
                    : state.followingInProgress.filter(elem => elem !== action.id) //?????????? ?????????????????? api.js ?? ???????????????????????? ???????????? changeSubscriptionStatus ???????????????????? isFetching false ?? ???????????? ?? followingInProgress ?? ???????? ?????????? ??????????????????   
            }
            case 'SN/USERS/SET_FILTER': {
                return {...state, filter: action.payload}
            }
        default:
            return state

    }
}
type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    follow: (userId: number) => {
        return ({ type: 'sn/users/FOLLOW', userId }) as const //?????????????????????? ?????? ??????????????????
    },
    unfollow: (userId: number) => {
        return { type: 'sn/users/UNFOLLOW', userId } as const
    },
    setUsers: (users: Array<UsersType>) => {
        return { type: 'sn/users/SET_USERS', users } as const
    },
    setCurrentPage: (currentPage: number) => {
        return { type: 'sn/users/SET_CURRENT_PAGE', currentPage } as const
    },
    setTotalUsersCount: (totalUsers: number) => {
        return { type: 'sn/users/SET_TOTAL_COUNT', count: totalUsers } as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return { type: 'sn/users/TOGGLE_IS_FETCHING', isFetching } as const
    },
    toggleFollowingProgress: (id: number, isFetching: boolean) => {
        return { type: 'sn/users/TOGGLE_IS_FOLLOWING_PROGRESS', id, isFetching } as const
    },
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),

}
type ThunkType = BaseThunkType<ActionsType>

// export type toggleFollowingProgressType = { --?????? ???? ???????????????????????? ?????? ???????????????? ???????????? ???? ????????????????????, ???????????????? ?????????????? ??????
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
//     id: number
//     isFetching: boolean
// }
// export const toggleFollowingProgress = (id: number, isFetching: boolean): toggleFollowingProgressType => {
//     return { type: TOGGLE_IS_FOLLOWING_PROGRESS, id, isFetching }
// }

// type GetStateType = () => AppStateType
// type DispatchType = Dispatch<ActionsType>  --- ?????????????? ?? ?????????????? ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> 

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
export const changeSubscrThunkCreator = (id: number, status: boolean): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleFollowingProgress(id, true))
        if (status === true) {
            let data = await usersAPI.unfollow(id)
            if (data.resultCode === 0) {
                dispatch(actions.unfollow(id))
            }
        } else if (status === false) {
            let data = await usersAPI.follow(id)
            if (data.resultCode === 0) {
                dispatch(actions.follow(id))
            }
        }
        dispatch(actions.toggleFollowingProgress(id, false))
    }
}

export default usersReducer;