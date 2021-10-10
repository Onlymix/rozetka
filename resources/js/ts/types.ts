export interface User {
    isLoggedIn: boolean
    login: string
    email: string
    tokenExpirationTime: number
}
export interface ExternalUserData {
    name: string
    email: string
}
