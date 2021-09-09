<template>
    <q-layout view="lhh Lpr lFf">
        <q-header style="background-color: #221f1f; height: 72px">
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
import { ref } from 'vue'
import AppHeader from './AppHeader'
import AppContent from './AppContent'
import SvgPackage from '../components/SvgPackage'

export default {
    name: 'Root',
    components: { SvgPackage, AppHeader, AppContent },
    setup() {
        return {
            leftDrawerOpen: ref(false),
        }
    },
}
</script>
