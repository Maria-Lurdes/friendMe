export interface LoginInfo {
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface User {
    displayName: string,
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface FbAythresponse {
    idToken: 'string',
    expiresIn?: 'string'
}

export interface FbCreateResponse {
    name: string
}

export  interface Post {
    id?: string,
    avatar?: string,
    color?: string,
    age: number,
    sex: string,
    weight: number,
    name: string,
    description: string,
    type: string
}
