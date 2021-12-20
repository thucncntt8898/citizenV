export const getStationMixin = {
    data() {
       return {
           isStationsLoading: false,
           stations: [],
       }
    },

    created() {
        this.getDataToFilter()
    },

    methods: {
        getDataToFilter() {
            this.isStationsLoading = true

            this.$store.dispatch('punishment/getStationPXteam').then(response => {
                if (response.data.success) {
                    this.stations = response.data.data
                }

                this.isStationsLoading = false
            })
        },
    }
}