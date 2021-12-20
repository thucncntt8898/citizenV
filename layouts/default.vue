<template>
  <div class="layout-default">
    <div class="left-side">

    </div>
  </div>
</template>

<script>
  import LayoutSidebar from "../components/Layout/LayoutSidebar.vue";
  import LayoutMenuHeader from "../components/Layout/LayoutMenuHeader.vue";

  export default {
    name: "default",
    components: {
      LayoutSidebar,
      LayoutMenuHeader,
    },
  }
</script>

<style>
html {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-family:
    'Roboto Condensed', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<style scoped lang="scss">
  @mixin tablet {
    @media(max-width: 1024px) {
      @content;
    }
  }

  .layout-default {
    display: flex;

    .right-side {
      display: flex;
      flex-direction: column;
      width: 100%;

      .main-content {
        scroll-behavior: smooth;
        display: flex;
        flex-direction: column;
        background-color: #f8f8f8;
        flex-basis: calc(100vh - 67px);
        overflow-y: auto;

        .go-top, .go-bottom {
          position: fixed;
          right: 40px;
          font-size: 50px;
          color: rgba(5, 143, 73, 0.4);
          cursor: pointer;
          z-index: 1;
        }

        .go-top {
          bottom: 20px;
        }

        .go-bottom {
          top: 100px;
        }

        .fade-enter-active, .fade-leave-active {
          transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }

        @include tablet {
          width: 100% !important;
        }
      }
    }

    .left-side {
      position: relative;
      background-color: #2e323a !important;
      transition: width 0.5s;
      /*width: 15.625rem;*/
      @include tablet {
        display: none;
      }

      .widening-btn {
        position: absolute;
        top: 19px;
        right: -12px;
        cursor: pointer;
        z-index: 1;
        transform: rotate(180deg);
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.5s;
        background-color: #e4e4e4;

        .close-sidebar {
          font-size: 16px;
          transition: all 0.5s ease 0s;
          color: #058f49;
        }
      }
    }
  }
</style>
