<template>
  <div id="general-situation-operator-main">
    <div class="genaral-header d-flex align-items-center justify-content-between">
      <h4 class="title">Tình hình nhập số liệu</h4>
    </div>
  </div>
</template>
<script>
import {asyncLocalStorage} from "@/store/localStorage";

export default {
  name: "index",

  layout: 'default-v2',

  middleware: 'authenticated',

  data() {
    return {
      isOnOff: true,
      actionType: 'route',
      isShowDetail: false,
      login: {},
    }
  },

  methods: {
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
