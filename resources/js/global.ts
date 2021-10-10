import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'
import { ExternalUserData, User } from './ts/types'
import { reactive } from 'vue'

export const user = reactive<User>({
    isLoggedIn: false,
    login: '',
    email: '',
    tokenExpirationTime: 0,
})
function removeUserData() {
    user.isLoggedIn = false
    user.login = ''
    user.email = ''
    user.tokenExpirationTime = 0
    localStorage.removeItem('login')
    localStorage.removeItem('email')
    localStorage.removeItem('tokenExpirationTime')
    useCookies().remove('JWT')
}

export function setLoginState(token: string) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    user.isLoggedIn = true
}
export function setUserData(data: ExternalUserData) {
    user.login = data.name
    user.email = data.email
    localStorage.setItem('login', data.name)
    localStorage.setItem('email', data.email)
}
export function setSavedUserData() {
    const login = localStorage.getItem('login'),
        email = localStorage.getItem('email')
    user.login = login ? login : 'noneStored'
    user.email = email ? email : 'noneStored'
}
export function logout(withoutRequest?: boolean) {
    if (withoutRequest) removeUserData()
    else axios.get('/api/auth/logout').then(() => removeUserData())
}
export function setToken(token: string, expires: number) {
    const date = new Date()
    date.setSeconds(date.getSeconds() + expires)
    useCookies().set('JWT', token, { expires: date })
    localStorage.setItem('tokenExpirationTime', date.getTime().toString())
    user.tokenExpirationTime = date.getTime()
}
export function refreshToken() {
    axios.get('/api/auth/refresh').then((response) => setToken(response.data.access_token, response.data.expires_in))
}
