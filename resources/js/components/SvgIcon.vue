<template>
    <svg aria-hidden="true" :width="w" :height="h" :viewBox="viewBox">
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
            default: null,
        },
        h: {
            type: String,
            required: false,
            default: null,
        },
        viewBox: {
            type: String,
            required: false,
            default: null,
        },
    },
}
</script>
