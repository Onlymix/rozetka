<template>
    <main class="flex q-px-lg">
        <app-content-sidebar />
        <q-separator vertical color="grey-12" />
        <section>content</section>
    </main>
</template>

<script>
import AppContentSidebar from './AppContentSidebar'
export default {
    name: 'AppContent',
    components: { AppContentSidebar },
}
</script>

<style lang="scss" scoped>
main {
    margin: 0 auto;
    max-width: 1600px;
}
</style>
