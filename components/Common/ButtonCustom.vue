<template>
    <button
        type="button"
        class="btn btn-success btn-custom"
        v-bind:style="{ backgroundColor: backgroundColor, borderColor: backgroundColor }"
        v-on:click="submit" :disabled="(isSpinner) ? true : false"
    >
        <i v-bind:class="classIcon"></i>
        {{buttonName}}
        <span class="spinner-border spinner-border-sm spinner-custom" role="status" aria-hidden="true" v-if="isSpinner"></span>
    </button>
</template>

<script>
    export default {
        name: "ButtonCustom",

        props:[
          'backgroundColor',
          'classIcon',
          'isSpinner',
          'buttonName'
        ],

        methods: {
            submit() {
                this.$emit('submitEvent');
            }
        }
    }
</script>

<style scoped lang="scss">
    .btn-custom {
        width: 100%;
        height: 100%;

        .spinner-custom {
            margin-left: 5px;
            margin-bottom: 1px;
        }
    }

    .btn-custom:focus, .btn-custom:not(:disabled):not(.disabled):active:focus{
        box-shadow:unset;
        outline: unset;
    }
</style>