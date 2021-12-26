<template>
    <div id="layout-right-side" v-on:click="">
      <div class="layout-right-side-body">
        <div class="menu-list" :class="showMenu ? 'menu-list-show' : 'menu-list-hide'">
          <div class="category-container">

          </div>
        </div>
        <div class="categories-container">
          <div class="category-operation">
            <div class="category-operation-header d-flex justify-content-between align-items-center">
              <div class="category-operation-header-title font-weight-bolder">
                <i class="fa fa-users"></i>Quản lý
              </div>
            </div>
            <div class="category-operation-body">
              <div class="d-flex align-items-center justify-content-between each-category" v-for="(operation, index) in operationCategories" :key="index"
                   :class="activeRoute(operation) ? 'each-category-active' : ''" v-on:click="pickCategoryOperation(operation)"
                   v-if="$auth.user[0].role < operation.role || operation.role == 1">
                <div>{{operation.text}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import ButtonCustom from "../../components/Common/ButtonCustom.vue";
    import DatePicker from 'vue2-datepicker'
    import 'vue2-datepicker/index.css'
    import moment from 'moment'
    import Loading from "../../components/Common/Loading.vue";
    export default {
        name: "RightSide",
        components: {Loading, ButtonCustom, DatePicker},
        data() {
            return {
                showMenu: 0,
                operationCategories: [
                    {id: 0, text: 'Tình hình nhập liệu', route: '/home', role: 1},
                    {id: 1, text: 'Quản lý tỉnh/thành phố', route: '/province', role: 2},
                    {id: 2, text: 'Quản lý quận/huyện', route: '/district', role: 3},
                    {id: 3, text: 'Quản lý phường/xã', route: '/ward', role: 4},
                    {id: 4, text: 'Quản lý thôn/bản/tổ dân phố', route: '/hamlet', role:5},
                    {id: 5, text: 'Quản lý tài khoản', route: '/account', role: 5},
                    {id: 6, text: 'Quản lý dân số', route: '/citizen', role: 6},
                ],

                isFilterLoading: false,
                date: new Date(moment().format('YYYY-MM-DD')),
            }
        },

      mounted() {
        },

        methods: {
          pickCategoryOperation(operation) {
            this.$router.push(operation.route);
          },

          activeRoute(operation) {
            if ($nuxt.$route.path.includes(operation.route)) return true
            return false
          }
        }
    }
</script>

<style scoped lang="scss">
    $color: #058f49;

    .ghtk-color {
        color: $color;
    }

    .categories-padding {
        padding: 0.3rem 0.7rem;
    }

    .width-label {
        width: 75px;
    }

    #layout-right-side {
        border-left: 1px solid #e8e8e8;
        height: calc(100vh - 40px);
        width: 250px;
        margin-top: 10px;

        .layout-right-side-header {
            height: 64px;
            padding: 0.7rem;

            .ico-menu {
                font-size: 20px;
                cursor: pointer;
                margin-top: 3px;
            }

            h5 {
                margin-bottom: unset;
            }

            .title {
                font-weight: bolder;
                font-size: 22px;
            }
        }

        .layout-right-side-body {
            height: calc(100vh - 104px);
            overflow-y: auto;

            .menu-list {
                position: fixed;
                right: 0;
                transition: all .5s;
                background-color: #182825;
                height: 100%;
                overflow-y: auto;
                color: #838790;

                .category-container {
                    .each-category {
                        .category-icon, .category-option-icon {
                            margin-right: 5px;
                        }

                        .each-category-detail {
                            position: relative;
                            padding: 0.7rem;
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

            .menu-list-hide {
                width: 0px;
                right: -250px;
                transition: all 1s;
            }

            .menu-list-show {
                width: 250px;
            }

            .categories {
                height: 100%;
                overflow-y: auto;
            }

            .categories-container {
                .category-operation {
                    .category-operation-header {
                        padding: 0.5rem 0.7rem;
                        background-color: rgba(196, 196, 196, 0.7);
                        border-bottom: 1px solid rgba(196, 196, 196, 0.7);
                    }

                    .each-category {
                        min-height: 47px;
                        @extend .categories-padding;
                        border-bottom: 1px solid rgba(196, 196, 196, 0.7);

                        .suborder-number {
                            font-size: 0.7rem;
                        }

                        .order-number {
                            font-size: 0.85rem;
                            font-weight: 500;
                        }
                    }

                    .each-category:hover {
                        background-color: rgba(238, 238, 238, 0.9);
                        cursor: pointer;
                    }

                    .each-category-active {
                        background-color: white;
                    }
                }
            }

            .categories-container {
                .category-operation-header {
                    .category-operation-header-filter {
                        padding: 2px 10px;
                        background-color: white;
                        cursor: pointer;
                        border-radius: 0.25rem;
                    }

                    .dropdown-category-operation-filter-content {
                        width: 500px;
                        box-shadow: 3px 3px 5px 0px #838790 !important;
                        padding: .7rem;
                        background-color: #f0f4f7;
                        position: absolute;
                        z-index: 0;
                        right: 11px;
                        top: 143px;
                        border-radius: 0.25rem;

                        .btn-custom-filter {
                            width: 25%;
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>
