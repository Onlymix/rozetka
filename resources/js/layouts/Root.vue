<template>
    <q-layout view="lhh Lpr lFf">
        <q-header class="bg-grey-10">
            <app-header v-model="leftDrawerOpen" />
        </q-header>

        <q-drawer v-model="leftDrawerOpen" behavior="mobile" no-swipe-backdrop overlay side="left" bordered>
            <!-- drawer content -->
        </q-drawer>

        <q-page-container>
            <app-content />
        </q-page-container>
    </q-layout>
    <svg-package />
</template>
<script>
import { ref, onMounted, inject } from 'vue'
import AppHeader from './AppHeader'
import AppContent from './AppContent'
import SvgPackage from '../components/SvgPackage'
import { logout, refreshToken, setLoginState, setSavedUserData } from '../global'
import { useCookies } from '@vueuse/integrations/useCookies'

export default {
    name: 'Root',
    components: { SvgPackage, AppHeader, AppContent },
    setup() {
        const user = inject('user')
        const jwt = useCookies().get('JWT')
        if (jwt) {
            setLoginState(jwt)
            const localToken = localStorage.getItem('tokenExpirationTime')
            if (localToken) {
                user.tokenExpirationTime = localToken
                setSavedUserData()
                if ((user.tokenExpirationTime - Date.now()) / 60000 < 30) refreshToken()
            }
        } else logout(true)
        onMounted(() => {
            // check user token exist and then if their time lower then 30 exec refresh token func
            setInterval(() => {
                if (user.tokenExpirationTime && (user.tokenExpirationTime - Date.now()) / 60000 < 30) refreshToken()
            }, 60000)
        })
        return {
            leftDrawerOpen: ref(false),
            user,
        }
    },
}
</script>
