<template>
    <q-layout view="lhh Lpr lFf">
        <q-header style="background-color: #221f1f; height: 72px">
            <app-header v-model="leftDrawerOpen" />
        </q-header>

        <q-drawer v-model="leftDrawerOpen" side="left" bordered>
            <!-- drawer content -->
        </q-drawer>

        <q-page-container>
            <!--            <router-view />-->
        </q-page-container>
    </q-layout>
</template>
<script>
import { ref } from 'vue'
import AppHeader from './AppHeader'

export default {
    name: 'Root',
    components: { AppHeader },
    setup() {
        return {
            leftDrawerOpen: ref(false),
        }
    },
}
</script>
<style>
body {
    background-color: rgb(26, 41, 79);
}
</style>
