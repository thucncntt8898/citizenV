<template>
    <div class="error_page">
        <span>404</span>
        <div>PAGE NOT FOUND</div>
        <button class="btn btn-success" type="button" v-on:click="$router.push('')">HOME PAGE</button>
    </div>
</template>

<script>
    export default {
        name: "error",

        layout: 'default-without-layout',
    }
</script>

<style scoped lang="scss">
    .error_page {
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        span:nth-child(1) {
            font-size: 300px;
            color: #e4e4e4;
            margin-top: -200px;
        }

        div:nth-child(2) {
            font-size: 50px;
            margin-top: -250px;
        }

        .btn-success {
            margin-top: 66px;
            width: 140px;
            border-radius: unset;
            background-color: #058f49;
        }
    }
</style>
