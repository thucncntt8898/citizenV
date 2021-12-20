<template>
  <div id="side-bar-xteam">
    <a class="logo" href="https://admin.giaohangtietkiem.vn/">
      <transition name="fade" mode="out-in">
      </transition>
    </a>
    <div class="xteam-categories">
      <div class="sidenav-divider mt-0"></div>
      <div class="category-contaner" v-if="isLongSidebar">
        <div class="each-category"
             v-for="(cat, index) in cartegories"
             :key="index"
        >
          <div class="each-category-detail"
               :class="{active: $store.state.localStorage.currentCategoryIndex === index}"
               data-toggle="collapse"
               :data-target="'#collapse' + index"
               :aria-controls="'collapse' + index"
               v-on:click="selectCategory(index)"
               v-if="isShowRoute(cat.route)"
          >
            <i class="fa category-icon" :class="cat.iconClass"></i>
            {{cat.text}}
            <span class="ico-arrow">
              <svg viewBox="0 0 1024 1024"
                   focusable="false" class=""
                   data-icon="caret-right"
                   width="1em"
                   height="1em"
                   fill="currentColor" aria-hidden="true"
                   :style="cat.isOpen ? 'transform: rotate(90deg);' : ''"
                   style="transition: all 0.3s;"
                   v-if="cat.options.length > 0"
              >
                <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
            </span>
          </div>
          <div class="collapse" :id="'collapse' + index" v-if="cat.options.length > 0">
            <div class="category-options"
                 :class="{active: $store.state.localStorage.currentCategoryOptionIndex === indOpt}"
                 v-for="(opt, indOpt) in cat.options"
                 :key="indOpt"
                 v-on:click="selectCategoryOption(index, indOpt)"
                 v-if="isShowRoute(opt.route)"
            >
              <i class="fa category-option-icon" :class="opt.iconClass"></i>
              {{opt.text}}
            </div>
          </div>
        </div>
      </div>
      <div class="category-contaner" v-else>
        <div class="each-category"
             v-for="(cat, index) in cartegories"
             :key="index"
        >
          <div class="each-category-detail text-center"
               :class="{active: $store.state.localStorage.currentCategoryIndex === index}"
               data-toggle="collapse"
               :data-target="'#collapse' + index"
               :aria-controls="'collapse' + index"
               :title="cat.text"
               v-on:click="selectCategory(index)"
               v-if="isShowRoute(cat.route)"
          >
            <i class="fa category-icon" :class="cat.iconClass"></i>
            <span class="ico-arrow">
              <svg viewBox="0 0 1024 1024"
                   focusable="false" class=""
                   data-icon="caret-right"
                   width="1em"
                   height="1em"
                   fill="currentColor" aria-hidden="true"
                   :style="cat.isOpen ? 'transform: rotate(90deg);' : ''"
                   style="transition: all 0.3s;"
                   v-if="cat.options.length > 0"
              >
                <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
            </span>
          </div>
          <div class="collapse" :id="'collapse' + index" v-if="cat.options.length > 0">
            <div class="category-options text-center"
                 :class="{active: $store.state.localStorage.currentCategoryOptionIndex === indOpt}"
                 v-for="(opt, indOpt) in cat.options"
                 :key="indOpt"
                 :title="opt.text"
                 v-on:click="selectCategoryOption(index, indOpt)"
                 style="margin: unset; padding: 0.75rem 0rem;"
                 v-if="isShowRoute(opt.route)"
            >
              <i class="fa category-option-icon" :class="opt.iconClass"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LayoutSidebar",

    props: [
      'cartegories',
      'currentCategoryIndex',
      'isLongSidebar'
    ],

    data() {
      return {}
    },

    methods: {
      selectCategory(index) {
        this.$emit('selectCategoryEvent', index)
      },

      selectCategoryOption(index, indOpt) {
        this.$emit('selectCategoryOptionEvent', index, indOpt)
      },

      scrollToSpecificTop(refName) {
        let element = document.getElementById(refName)
        if (element != null) {
          element.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
      },

      isShowRoute(route) {
        let subRoute = route.substring(1, route.length)
        let keys = Object.keys(this.$store.state.localStorage.routesPermission)
        let indexKey = keys.findIndex(key => key === subRoute)

        let check = false
        if (indexKey < 0) {
          check = true
        } else {
          if (this.$store.state.localStorage.routesPermission[subRoute].findIndex(key => key == this.$auth.user.username) > -1) {
            check = true
          }
        }

        return check;
      }
    }
  }
</script>

<style scoped lang="scss">
  $ghtk_color: #058f49;

  @mixin tablet {
    @media(max-width: 1024px) {
      @content;
    }
  }

  #side-bar-xteam {
    width: 100%;
    color: #838790;

    @include tablet {
      display: none;
    }

    .logo {
      height: 65px;
      display: flex;
      align-items: center;
      padding-right: 1.75rem;
      padding-left: 1.75rem;
      background-color: $ghtk_color;
      cursor: pointer;

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity .2s
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0
      }

      img {
        height: 30px;
      }
    }

    .sidenav-divider {
      width: 100%;
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 1rem;
    }

    .xteam-categories {
      max-height: calc(100vh - 65px);
      overflow-y: auto;

      .category-contaner {
        .each-category {
          .category-icon, .category-option-icon {
            margin-right: 5px;
          }

          .each-category-detail {
            position: relative;
            padding: .75rem 1.5rem;
          }

          .ico-arrow {
            position: absolute;
            right: 0.7rem;
          }

          .each-category-detail.active, .each-category-detail:hover {
            color: white;
            cursor: pointer;
          }

          .category-options {
            padding: .75rem 1.5rem 0.75rem 2.25rem;
          }

          .category-options.active, .category-options:hover {
            color: #fff;
            cursor: pointer;
            background-color: #383c44;
          }
        }
      }
    }
  }
</style>
