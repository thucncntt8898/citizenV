<template>
    <div id="menu-header-xteam">
      <loading v-if="isLoading"></loading>
      <div class="header-div">
        <div class="left-side-header">
          <div class="ico-menu">
            <i class="fa fa-bars ion-md-menu text-large align-middle"
               v-on:click="openCollapse">
            </i>
          </div>
          <a class="ico-home" href="#">
            <i class="fa fa-home"></i> Trang chủ
          </a>
        </div>
        <div class="logout" v-on:click="logout">
          <i class="fa fa-sign-out"></i>
          Đăng xuất
        </div>
      </div>
      <transition name="collapse" mode="out-in">
        <div id="collapse-top" v-if="isOpenCollapse">
          <div class="categories">
            <div class="each-category"
                 :class="{active: currentCategoryIndex === index}"
                 v-for="(cat, index) in cartegories" :key="index"
                 v-on:click="selectCategory(index)">
              <i class="fa category-icon" :class="cat.iconClass"></i>
              {{cat.text}}
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import Loading from "../Common/Loading.vue";
  export default {
    name: "LayoutMenuHeader",

    components: {Loading},

    props: [
      'cartegories',
      'currentCategoryIndex'
    ],

    data() {
      return {
        isOpenCollapse: false,
        isLoading: false
      }
    },

    watch: {
      currentCategoryIndex(val) {
      },
    },

    methods: {
      async logout() {
        this.isLoadding = true
        try {
          await this.$auth.logout()

          if (!this.$auth.loggedIn) {
            this.isLoadding = false
            this.$toast.success('Đăng xuất thành công.')
            this.$store.dispatch('x-screen/resetData')
            this.$store.dispatch('localStorage/reset')
            this.$router.push('/login')
          }
        } catch (e) {
          this.isLoadding = false
          this.$toast.error('Đăng xuất thất bại.')
        }
      },

      selectCategory(index) {
        this.$emit('selectCategoryEvent', index)
      },

      openCollapse() {
        this.isOpenCollapse = !this.isOpenCollapse
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin tablet {
    @media(max-width: 1024px) {
      @content;
    }
  }

  #menu-header-xteam {
    background-color: white;
    color: #a3a4a6;
    display: flex;
    flex-direction: column;
    align-items: center;

    .collapse-leave-active, .collapse-enter-active {
      transition: opacity 0.5s;
    }

    .collapse-enter, .collapse-leave-to {
      opacity: 0
    }

    @include tablet {
      justify-content: space-between;
      width: 100% !important;
    }

    .header-div {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1.28rem 2rem;
      @include tablet {
        justify-content: space-between;
        padding: 1.03rem 2rem;
      }

      .left-side-header {
        display: flex;
        align-items: center;

        .ico-home {
          color: #a3a4a6;
          @include tablet {
            margin-left: 2rem;
          }
          i {
            font-size: 20px;
          }
        }

        .ico-home:hover {
          text-decoration: none;
        }
      }

      .ico-menu {
        display: none;
        @include tablet {
          display: block;
        }

        .ion-md-menu {
          cursor: pointer;
        }

        .ion-md-menu:before {
          font-size: 2rem;
        }
      }

      .logo {
        position: absolute;
        right: 50%;
        transform: translateX(50%);
        display: none;
        @include tablet {
          display: block;
        }

        img {
          width: 160px;
        }
      }

      .logout {
        cursor: pointer;
      }
    }

    #collapse-top {
      width: 100%;
      background-color: #2e323a !important;
      .categories {
        margin-top: 1rem;
        margin-bottom: 1rem;
        display: none;

        @include tablet {
          display: block;
        }

        .each-category {
          padding: 1rem 2rem;
          cursor: pointer;
        }

        .each-category.active {
          background-color: #383c44;
          color: white;
        }
      }
    }
  }

</style>
