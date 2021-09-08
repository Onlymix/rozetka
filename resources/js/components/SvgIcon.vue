<template>
    <svg aria-hidden="true" :width="w" :height="h">
        <use :href="'#' + iconId" />
    </svg>
</template>

<script>
export default {
    props: {
        iconId: {
            required: true,
            type: String,
        },
        w: {
            type: String,
            required: false,
            default: 'auto',
        },
        h: {
            type: String,
            required: false,
            default: 'auto',
        },
    },
}
</script>
