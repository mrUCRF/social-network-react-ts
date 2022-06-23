import { GetItemsType, instatnse, APIResponseType } from './api'



export const usersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return instatnse.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
        .then((response) => {
            return response.data
        })
    },

    unfollow(userId: number) {
        return (
            instatnse.delete<APIResponseType>(`follow/${userId}`).then((response) => {
                return response.data
            })
        )
    },

    follow(userId: number) {
        return (
            instatnse.post<APIResponseType>(`follow/${userId}`).then((response) => {
                return response.data
            })
        )
    }
}