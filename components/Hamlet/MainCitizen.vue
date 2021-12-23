<template>
  <div id="manage-province-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý tài khoản</h4>
      </div>
    </div>
    <div v-if="step == 1">
      <table-user
        :users="users"
        @handleUpdateEvent="updateEvent"
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
      <FormFilterProvince
        :action-type="actionType"
        :rowIsSelected="rowIsSelected"
        :actionType="actionType"
        @goBackEvent="handleGoBackEvent"
      >
      </FormFilterProvince>
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
    this.getListUsers();
  },

  mixins: [help],

  data() {
    return {
      isLoadingProvince: false,
      users: [],
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
    getListUsers(type='filter') {
      if(type == 'filter') {
        this.currentPage = 1
      }

      this.isLoadingProvince = true

      this.paramReq = {
        'page': this.currentPage,
        'limit': this.limit,
        'province_ids': this.provinces,
        'district_ids': this.districts,
        'ward_ids': this.wards,
        'hamlet_ids': this.hamlets
      }

      this.$store.dispatch('user/getListUsers', this.paramReq).then(response => {
        if (response.data.success) {
          this.users = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.users.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingProvince = false;
      })
    },

    createEvent() {
      this.step = 2;
      this.actionType = 'add';
    },

    updateEvent(data) {
      this.rowIsSelected = data;
      this.step = 2;
      this.actionType = 'edit';
    },

    handleGoBackEvent() {
      this.step = 1;
      this.rowIsSelected = {};
      this.getListUsers('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListUsers('paginate');
    }
  }
}
</script>
