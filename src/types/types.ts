export type initialStatePostType = {
    id: number
    messagePost: string
    likeCount: number | string
}
export type contactsType = {
    github: string | null
vk: string | null
facebook: string | null
instagram: string | null
twitter: string | null
website: string | null
youtube: string | null
mainLink: string | null
}
export type photosType = {
    small: string | null
    large: string | null
} 
export type profileType = {
    userId: number
lookingForAJob: boolean | null
lookingForAJobDescription: string
fullName: string
contacts: contactsType
photos: photosType
}

export type UsersType = {
    id: number
name: string
status: string
photos: photosType
followed: boolean
}

export type ProfileDataType = {
    aboutMe: string | null
contacts: contactsType
fullName: string | null
lookingForAJob: boolean
lookingForAJobDescription: string | null
}