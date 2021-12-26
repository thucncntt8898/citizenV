import {debounce} from 'lodash'
import moment from "moment";

export const help = {
  data() {
    return {
      provinces: [],
      districts: [],
      wards: [],
      hamlets: [],
      provincesAreSelected: '',
      districtsAreSelected: '',
      wardsAreSelected: '',
      hamletsAreSelected: '',
      user: this.$auth.user[0],
    }
  },

  watch: {
    provincesAreSelected(val) {

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

    checkUserPermission() {
      let user = this.$auth.user[0];
      let today = new Date();
      if (user.status == 0 || new Date(user.time_start).getTime() > today.getTime() || new Date(user.time_finish) < today.getTime()) {
        return false;
      }
      return true;
    },

    getInfoAddresses() {
      this.$store.dispatch('user/getInfoAddresses', this.paramReq).then(response => {
        if (response.data.success) {
          let data = response.data.data;
          this.provinces = data.provinces != undefined ? data.provinces : [];
          this.districts = data.districts != undefined ? data.districts : [];
          this.wards = data.wards != undefined ? data.wards : [];
          this.hamlets = data.hamlets != undefined ? data.hamlets : [];
        } else {
          this.$toast.error('Lỗi.');
        }
      })
    },
  }
}
