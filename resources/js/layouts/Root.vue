<template>
    <q-layout view="lhh Lpr lFf">
        <q-header class="bg-grey-10">
            <app-header v-model="leftDrawerOpen" />
        </q-header>

        <q-drawer v-model="leftDrawerOpen" behavior="mobile" no-swipe-backdrop overlay side="left" bordered>
            <!-- drawer content -->
            <sidebar />
        </q-drawer>

        <q-page-container>
            <app-content />
        </q-page-container>
    </q-layout>
    <svg-package />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppContent from './AppContent.vue'
import SvgPackage from '../components/SvgPackage.vue'
import Sidebar from './Sidebar.vue'
import { logout, refreshToken, setLoginState, setSavedUserData } from '../global'
import { useCookies } from '@vueuse/integrations/useCookies'
import { injectStrict } from '../ts/utils'
import { UserKey } from '../ts/symbols'

const user = injectStrict(UserKey),
    jwt = useCookies().get('JWT'),
    leftDrawerOpen = ref(false)
if (jwt) {
    setLoginState(jwt)
    const localToken = localStorage.getItem('tokenExpirationTime')
    if (localToken) {
        user.tokenExpirationTime = Number(localToken)
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
</script>
