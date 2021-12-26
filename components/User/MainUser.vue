<template>
  <div id="manage-province-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý tài khoản</h4>
      </div>
    </div>
    <div v-if="step == 1">
      <table-user
        :list-users="listUsers"
        :is-loading-hamlet="isLoadingUser"
        @handleUpdateEvent="updateEvent"
        @handleFilter="handleFilter"
        @handleCreateEvent="createEvent"
      ></table-user>
      <div class="row">
        <div class="col-2">
          <show-text-entries
            :currentTotal="currentTotal"
            :countAll="countAll"
          >
          </show-text-entries>
        </div>
        <div class="col-10">
          <pagination-custom :current-page="currentPage" :page-count="pageCount" @selectPageEvent="handleSelectPageEvent"></pagination-custom>
        </div>
      </div>
    </div>
    <div id="form-config" v-if="step == 2">
      <FormFilterUser
        :action-type="actionType"
        :rowIsSelected="rowIsSelected"
        :actionType="actionType"
        @goBackEvent="handleGoBackEvent"
      >
      </FormFilterUser>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormFilterUser from "./FormFilterUser.vue";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableProvince from "./TableUser.vue";
import {help} from "../../plugins/mixins/help.js";
import TableUser from "./TableUser.vue";

export default {
  name: "MainUser",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableUser, FormFilterUser},

  created() {
  },

  mixins: [help],

  data() {
    return {
      isLoadingUser: false,
      listUsers: [],
      currentPage: 1,
      limit: 10,
      pageCount: 0,
      paramsReq: {},
      step: 1,
      rowIsSelected: {},
      actionType: 'add',
      countAll: 0,
      currentTotal: 0,
      provinces: [],
      districts: [],
      wards: [],
      hamlets: []
    }
  },

  methods: {
    createEvent() {
      this.step = 2;
      this.actionType = 'add';
    },

    handleGoBackEvent() {
      this.step = 1;
      this.rowIsSelected = {};
      this.handleFilter(this.paramReq, 'paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.handleFilter(this.paramReq, 'paginate');
    },

    handleFilter(paramReq, type = 'filter') {
      this.isLoadingDistrict = true;
      this.paramReq = paramReq;
      if (type == 'filter') {
        this.currentPage = 1;
      }
      this.paramReq.page = this.currentPage;
      this.paramReq.limit = 10;
      this.$store.dispatch('user/getListUsers', this.paramReq).then(response => {
        if (response.data.success) {
          this.listUsers = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.listUsers.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingDistrict = false;
      })
    },

    updateEvent(data) {
      this.rowIsSelected = data;
      this.step = 2;
      this.actionType = 'edit';
    },
  }
}
</script>
