<template>
  <div id="manage-ward-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý xã/phường/thị trấn </h4>
      </div>
    </div>
    <div v-if="step == 1">
      <table-ward
        :ward-list="wardList"
        :is-loading-ward="isLoadingWard"
        @handleUpdateEvent="updateEvent"
        @handleFilter="handleFilter"
        @handleCreateEvent="createEvent"
      ></table-ward>
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
      <FormFilterWard
        :action-type="actionType"
        :rowIsSelected="rowIsSelected"
        :actionType="actionType"
        @goBackEvent="handleGoBackEvent"
      >
      </FormFilterWard>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormFilterWard from "./FormFilterWard.vue";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableWard from "./TableWard.vue";
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "MainWard",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableWard, FormFilterWard},

  created() {
  },

  mixins: [help],

  data() {
    return {
      isLoadingWard: false,
      currentPage: 1,
      limit: 10,
      districtId: this.$auth.user.district_id,
      pageCount: 0,
      paramsReq: {},
      step: 1,
      rowIsSelected: {},
      actionType: 'add',
      countAll: 0,
      currentTotal: 0,
      paramReq: {},
      wardList: [],
    }
  },

  methods: {
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
      this.$store.dispatch('ward/getListWards', this.paramReq).then(response => {
        if (response.data.success) {
          this.wardList = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.wardList.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingDistrict = false;
      })
    }
  }
}
</script>
