<template>
</template>

<script>
    import nuxtConfig from "../nuxt.config";
    export default {

        middleware: 'authenticated',

        asyncData(context) {
            // context.redirect('/v2/general-situation-operator')
        }
    }
</script>

<style>

</style>
