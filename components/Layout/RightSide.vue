<template>
    <div id="layout-right-side" v-on:click="openMainContent">

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
                    {id: 0, text: 'Tình hình vận hành', point: 0, order: 0, subOrder: 0, route: '/v2/general-situation-operator'},
                    {id: 1, text: 'Quản lý Xteam của NVBC', point: 0, order: 0, subOrder: 0, route: '/v2/general-operation'},
                    {id: 2, text: 'Quản lý đơn delay', point: 0, order: 0, subOrder: 0, route: '/v2/delay-order'},
                    {id: 3, text: 'Báo cáo sai km', point: 0, order: 0, subOrder: 0, route: '/v2/report-km'},
                    {id: 4, text: 'Thiếu hàng', point: 0, order: 0, subOrder: 0, route: '/v2/miss-order'},
                    {id: 5, text: 'Hủy đơn', point: 0, order: 0, subOrder: 0, route: '/v2/cancel-order'},
                    {id: 6, text: 'Bồi hoàn', point: 0, order: 0, subOrder: 0, route: '/v2/refund-order'},
                    {id: 7, text: 'Khiếu nại', point: 0, order: 0, subOrder: 0, route: '/v2/claim-order'},
                    {id: 8, text: 'Dashboard', point: 0, order: 0, subOrder: 0},
                    {id: 9, text: 'Bản đồ vận hành', point: 0, order: 0, subOrder: 0, route: 'map'}
                ],

                menuCategories: [
                    {id: 0, text: 'Quản lý', route: '', iconClass: 'fa-cog', options: [
                            {id: 0, text: 'Quản lý phạt X', route: '/v2/punishment-management', iconClass: 'fa-hand-pointer-o'},
                            {id: 1, text: 'Quản lý ticket', route: '/v2/issues', iconClass: 'fa-ticket'},
                            {id: 2, text: 'Quản lý tiền CoD', route: '/v2/manage-money', iconClass: 'fa fa-money'},
                            {id: 3, text: 'Quản lý config', route: '/v2/global-config', iconClass: 'fa fa-wrench'},
                            {id: 4, text: 'Quản lý Xteam', route: '/v2/manage-xteam', iconClass: 'fa fa-users'},
                            {id: 5, text: 'Quản lý config cod', route: '/v2/config-cod', iconClass: 'fa-user-secret'},
                            {id: 6, text: 'Quản lý config Xstar', route: '/v2/config-xstar', iconClass: 'fa-star'},
                            {id: 7, text: 'Quản lý routing config', route: '/v2/routing-config', iconClass: 'fa-sitemap'}
                        ], isOpen: false},
                    {id: 1, text: 'Quản lý app version', route: '/v2/app-version', iconClass: 'fa-mobile', options: [], isOpen: false}
                ],

                isFilterLoading: false,
                date: new Date(moment().format('YYYY-MM-DD')),
                sessionIsSlected: null,
                districtsAreSelected: [],
                isShowFilter: false
            }
        },

        mounted() {
        },

        methods: {
            showMenuList() {
                this.showMenu = !this.showMenu
                this.isShowFilter = false
            },
        }
    }
</script>

<style scoped lang="scss">
    $ghtk_color: #058f49;

    .ghtk-color {
        color: $ghtk_color;
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
                        background-color: rgba(238, 238, 238, 0.9);
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
