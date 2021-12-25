import {debounce} from 'lodash'
import moment from "moment";
export const help = {
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

    methods: {
      getPageCount(total, limit) {
        let pageCount = parseInt(total / limit)
        if (total % limit != 0) {
          pageCount += 1
        }
        return pageCount
      },

      disabledAfterToday(date) {
        const today = new Date();
        return date > today;
      },

    }
}
