<template>
    <div id="layout-left-side">
        <!-- <iframe id="iframe-ightk" class="iframe-ightk" :src="getChatUrl" frameborder="0" width="100%" height="100%"
                marginwidth="0" marginheight="0" scrolling="auto" allowfullscreen="true" ref="iframe-ghtk" v-on:mouseenter="mouseOver">
        </iframe> -->
        <transition name="main-content-fade">
            <div class="main-content" id="main-content" v-show="$store.state.layoutV2.isOpenMainContent">
                <Nuxt/>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "LeftSide",

        data() {
            return {
                isOpenMainContent: 0
            }
        },

        methods: {
            mouseOver() {
                this.isOpenMainContent = 1
                document.getElementsByTagName('iframe')[0].blur()
                document.getElementsByTagName('body')[0].focus()
            },
        }
    }
</script>

<style lang="scss">
    @mixin smallDesktop {
        @media (max-width: 1600px) {
            @content;
        }
    }

    #layout-left-side {
        width: calc(100vw - 250px);
        height: calc(100vh - 40px);
        position: relative;

        /*.iframe-ightk {
            width: 100%;
            height: 100%;
        }*/

        .main-content {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            overflow-y: auto;
            width: 100%;
            background-color: white;
            border-left: 1px solid rgba(196, 196, 196, 0.7);

            /*@include smallDesktop {*/
                /*width: calc(100vw - 535px);*/
            /*}*/
        }

        .main-content-fade-enter-active, .main-content-fade-leave-active {
            transition: all .3s ease;
        }

        .main-content-fade-enter, .main-content-fade-leave-to {
            transform: translateX(250px);
            opacity: 0;
        }
    }
</style>
