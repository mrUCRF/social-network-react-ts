import { UsersType } from './../types/types';
import { createSelector } from 'reselect'
import { AppStateType } from "./redux-store"

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {

    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize
}

// export const superSelector = createSelector(getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, ////
// (users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress) => {
//     return
// }) ///вызов селектора в юзерс селектора

// вызов селекторов в мап стейт ту пропс:
// users: superSelector(state),
// pageSize: superSelector(state)   ---в супер селектор закидывается стейт, вызывается и пробрасывается в тот примит селектор который у нас изменился и запускается сложный селектор



