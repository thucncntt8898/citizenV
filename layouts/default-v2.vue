<template>
    <div id="layout-v2">
        <menu-header></menu-header>
        <div class="layout-body d-flex align-items-center">
            <left-side></left-side>
            <right-side></right-side>
        </div>
    </div>
</template>

<script>
    import MenuHeader from "../components/Layout/MenuHeader.vue";
    import RightSide from "../components/Layout/RightSide";
    import LeftSide from "../components/Layout/LeftSide";
    export default {
        name: "default-v2",
        components: {LeftSide, RightSide, MenuHeader},

        created() {

        },

        methods: {
        }
    }
</script>

<style scoped lang="scss">
    menu-header {
        width: 40px;
    }
</style>
<style>
    body {
        font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif !important;

    }

    html {
        font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif !important;
        font-size: 14px !important;
    }
</style>
