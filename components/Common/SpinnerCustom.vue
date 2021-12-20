<template>
    <div class="text-center">
        <div class="loader"></div>
    </div>
</template>

<script>
    export default {
        name: "Spinner"
    }
</script>

<style scoped>
    .loader {
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        border-top: 4px solid #058f49;
        width: 2rem;
        height: 2rem;
        animation: spin 1.5s linear infinite;
        margin: auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .text-center {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>