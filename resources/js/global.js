import { reactive } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'

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
export const user = reactive({
    isLoggedIn: false,
    login: '',
    email: '',
    tokenExpirationTime: 0,
})
export function setLoginState(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    user.isLoggedIn = true
}
export function setUserData(data) {
    user.login = data.name
    user.email = data.email
    localStorage.setItem('login', data.name)
    localStorage.setItem('email', data.email)
}
export function setSavedUserData() {
    user.login = localStorage.getItem('login')
    user.email = localStorage.getItem('email')
}
export function logout(withoutRequest) {
    if (withoutRequest) removeUserData()
    else axios.get('/api/auth/logout').then(() => removeUserData())
}
export function setToken(token, expires) {
    const date = new Date()
    date.setSeconds(date.getSeconds() + expires)
    useCookies().set('JWT', token, { expires: date })
    localStorage.setItem('tokenExpirationTime', date.getTime().toString())
    user.tokenExpirationTime = date.getTime()
}
export function refreshToken() {
    axios.get('/api/auth/refresh').then((response) => setToken(response.data.access_token, response.data.expires_in))
}
