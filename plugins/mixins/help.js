import {debounce} from 'lodash'
import moment from "moment";
export const help = {
    created () {
        this.onSearch = debounce(($event, pkg, type) => this.seachXteam($event, pkg, type), 500)
        this.onSearchAllXteam = debounce(($event) => this.searchAllXteam($event), 500)
        this.onSeachXteamToAssgin = debounce(($event, lat, lng, provinceId) => this.seachXteamToAssgin($event, lat, lng, provinceId), 500)
    },

    data() {
        return {
            xteamOptions: [],
            codOptions: [],
            isLoadingAllXteam: false,
            isLoadingXteamToAssign: false,
            stations: [],
            districts: [],
            isStationsLoading: false,
            isLoadingDistrict: false,
            stationsOriginal: [],
            districtsOriginal: []
        }
    },

    // watch: {
    //     '$store.state.layoutV2.isDataFilterCompletedLoading': function (val) {
    //         if (val) {
    //             let stations = this.$store.state.layoutV2.districts.filter(station => station.province_id === this.$auth.user.province_id)
    //             this.$store.dispatch('layoutV2/setDistrictsAreSelected', stations)

    //             let currentTime = moment().format('HH:mm:ss')
    //             let sessions = this.$store.state.layoutV2.sessions;
    //             for (let i = 0; i < sessions.length; i++) {
    //                 if (currentTime >= moment().format(sessions[i].from_at) && currentTime < moment().format(sessions[i].to_at)) {
    //                     this.$store.dispatch('layoutV2/setSessionIsSelected', sessions[i]);
    //                 }
    //             }

    //             this.getPackages()
    //         }
    //     },
    // },

    methods: {
        customLabel ({ alias, username, fullname, phone1}) {
            return `${alias} – ${username} – ${fullname} - ${phone1}`
        },

        seachXteam($event, pkg, type) {
            if ($event) {
                pkg.is_loading = true

                let payload = {
                    term: $event,
                    page: 1,
                    limit: 20,
                    type: type,
                    package_id: pkg.pkg_id
                }
                this.$store.dispatch('x-screen/searchXteam', payload).then(response => {
                    if (response.data.success) {
                        pkg.cods = JSON.parse(JSON.stringify(response.data.data))
                        pkg.cods.forEach(cod => {
                            this.$set(cod, 'tel', cod.phone1);
                            this.$set(cod, 'cod_id', cod.id);
                        })
                        pkg.is_loading = false
                    } else {
                        this.$toast.error('Lấy dữ liệu thất bại.')
                        pkg.is_loading = false
                    }
                })
            }
        },

        handleSubmitEvent(pkg, status) {
            this.$swal({
                title: 'Bạn có muốn gán cod vừa chọn không?',
            }).then((result) => {
                if (result.isConfirmed) {
                    pkg.is_filter = true

                    let formData = new FormData()
                    if (pkg.cod_is_selected) {
                        formData.append("data[0][cod_id]", pkg.cod_is_selected.cod_id)
                    }
                    formData.append("data[0][package_id][]", pkg.pkg_id)

                    let payload = {
                        params: formData
                    }

                    if (this.ordersStatus === 2 && (pkg.package_status_id == 12 || pkg.package_status_id == 4)) {
                        if (status === 'pick') {
                            this.assignCods(payload, 'x-screen/changePickingCod', pkg)
                        }

                        if (status === 'deliver') {
                            this.assignCods(payload, 'x-screen/changeDeliveringCod', pkg)
                        }
                    } else {
                        if (status === 'pick') {
                            this.assignCods(payload, 'x-screen/exportPicking', pkg)
                        }

                        if (status === 'deliver') {
                            this.assignCods(payload, 'x-screen/exportDelivering', pkg)
                        }

                        if (status === 'return') {
                            this.assignCods(payload, 'x-screen/exportReturning', pkg)
                        }
                    }
                }
            })
        },

        assignCods(payload, action, pkg) {
            this.$store.dispatch(action, payload).then(response => {
                if (response.data.success) {
                    this.$toast.success(response.data.message)
                } else {
                    this.$toast.error(response.data.message);
                }

                pkg.is_filter = false
            })
        },

        getPageCount(total, limit) {
            let pageCount = parseInt(total / limit)
            if (total % limit != 0) {
                pageCount += 1
            }
            return pageCount
        },

        handleSelectPageEvent(page) {
            this.currentPage = page
            this.getPackages()
        },


        getImageLink(pkg, img) {
            let access_token = this.$auth.$storage.getLocalStorage('token_local').substr(7, this.$auth.$storage.getLocalStorage('token_local').length)
            return process.env.apiURL + 'distributor/get-view-image-by-package?exp=' + pkg.exp + '&po=' + pkg.pkg_order + '&code=' + pkg.code + '&fi=' + img + '&access_token=' + access_token;
        },

        getOptionTitle(option) {
            return option.alias + ' - ' + option.fullname + ' - ' + option.tel + ' | ' + 'Đang: ' + option.pending + '/' + option.taking
        },

        getOptionSmall(option) {
            if(option.distance != 0 || option.distance != -1)
            {
                return 'BC về: ' + option.station + ' | Cách điểm: ' + option.distance + ' km | Thời gian: ' + option.time + ' phút'
            }
            return 'BC về: ' + option.station
        },

        onComment(pkg) {
            if (!this.isNullOrWhitespace(pkg.comment_content)) {
                let commentObj = {
                    action: "comment",
                    content: pkg.comment_content,
                    created: moment().format('YYYY-MM-DD hh:mm:ss'),
                    issue_id: pkg.issue_id,
                    shop_id: "",
                    shop_name: "",
                    creator_id: this.$auth.user.ghtk_id,
                    creator_name: this.$auth.user.fullname
                }

                pkg.comments.unshift(commentObj)

                this.$store.dispatch('x-screen/createCommentForIssue', {issue_id: pkg.issue_id, content: pkg.comment_content}).then(response => {
                    if (!response.data.success) {
                        this.$toast.error(response.data.message)
                    }
                })

                pkg.comment_content = ''
            }
        },

        searchAllXteam($event) {
            if ($event) {

                let payload = {
                    term: $event,
                    limit: 20,
                    page:1
                }
                this.isLoadingAllXteam = true
                this.$store.dispatch('manageXteam/searchAllXteams', payload).then(response => {
                    if (response.data.success) {
                        this.xteamOptions = JSON.parse(JSON.stringify(response.data.data))
                    }
                    this.isLoadingAllXteam = false
                })
            }
        },

        seachXteamToAssgin($event, pkgLat, pkgLng, provinceId) {
            this.isLoadingXteamToAssign = true
            let params = {
                term: $event,
                pkg_lng: pkgLng,
                pkg_lat: pkgLat,
                address_id: provinceId,
                date: new Date(moment().format('YYYY-MM-DD')),
                page: 1,
                limit: 20
            }

            this.$store.dispatch('x-screen/searchAllXteamsToAssign', params).then(response => {
                if (response.data.success) {
                    this.codOptions = JSON.parse(JSON.stringify(response.data.data))
                } else {
                    this.$toast.error('Lấy dữ liệu thất bại.')
                }
                this.isLoadingXteamToAssign = false
            })
        },

        getStations() {
            this.isStationsLoading = true
            this.$store.dispatch('bag/getStations').then(response => {
                if (response.data.success) {
                    this.stations = response.data.data;
                    this.stationsOriginal = response.data.data;
                }
                this.isStationsLoading = false
            })
        },

        getDistricts() {
            this.isLoadingDistrict = true
            this.$store.dispatch('inventoryManagement/getDistrictByProvinceId').then(response => {
                if (response.data.success) {
                    this.districts = response.data.data
                    this.districtsOriginal = response.data.data
                }
                this.isLoadingDistrict = false
            })
        }
    }
}
