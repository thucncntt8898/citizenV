<template>
  <div id="general-situation-operator-main">
    <main-home>
    </main-home>
  </div>
</template>

<script>
import moment from "moment";
import MainHome from "../../components/Home/MainHome.vue";

export default {
  name: "index",

  layout: 'default-v2',

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {
    MainHome
  },

  data() {
    return {
      currentTime: '',
      remainMinute: 0,
      isShowStation: false,
      isCountPackagesLoading: false,
      page: 1,
    }
  },

  created() {
    this.getTime();
  },

  methods: {
    getRemainTime() {
      let endTime = this.getEndTime()
      if (endTime == 0) {
        this.remainMinute = 0
        return;
      }

      this.remainMinute = moment(endTime).diff(moment(), 'minutes')
      if (this.remainMinute < 0) {
        this.remainMinute = 0
      }
    },

    getTime() {
      let h = this.checkTime(moment().hours())
      let m = this.checkTime(moment().minutes())
      this.currentTime = h + ':' + m
      this.getRemainTime()
      this.timeoutTime = setTimeout(i => {
        this.getTime()
      }, 1000);
    },

    checkTime(time) {
      if (time < 10) {
        return '0' + time
      }

      return time
    },

    getEndTime() {
      if (this.sessionIsSlected) {
        let endTime = moment(this.date).format('YYYY-MM-DD 10:30:59')
        switch (this.sessionIsSlected.id) {
          case "5":
            endTime = moment(this.date).format('YYYY-MM-DD 13:30:59')
            break
          case "8":
            endTime = moment(this.date).format('YYYY-MM-DD 15:30:59')
            break
          case "11":
            endTime = moment(this.date).format('YYYY-MM-DD 17:30:59')
            break
          case "25":
            endTime = moment(this.date).format('YYYY-MM-DD 19:30:59')
            break
          case "28":
            endTime = moment(this.date).format('YYYY-MM-DD 23:59:59')
            break
        }

        return endTime
      }

      return 0
    },


    handleGoBackEvent() {
      this.isShowStation = false;
      this.$store.dispatch('x-screen/resetData');
    },

  }
}
</script>

<style scoped lang="scss">
#general-situation-operator-main {
  height: 64px;
  padding: 0 0.5rem;
  .genaral-header > .title {
    margin-bottom: unset;
    font-weight: bolder;
    font-size: 22px;
  }

  .route-code-open-close-btn {
    background-color: #c4c4c4;
    border-radius: 20px;
    width: 86px;
    color: white;
    margin-top: 15px;
    height: 35px;

    .route-code-open, .route-code-close {
      padding: 6px 6px;
      border-radius: 20px;
      width: 45px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
      height: 35px;
    }
  }
}
</style>
