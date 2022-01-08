export interface User {
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface FbAythresponse{
    idToken: 'string',
    expiresIn: 'string'
}

export interface FbCreateResponse{
    name: string
}
