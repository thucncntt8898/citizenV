<template>
  <div id="manage-ward-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý xã/phường/thị trấn </h4>
      </div>
      <div class="col-2 filter-area mb-1">
        <button-custom class="btn-add" classIcon="fa fa-plus-circle" buttonName="Thêm mới" @submitEvent="createEvent()"></button-custom>
      </div>
    </div>
    <div v-if="step == 1">
      <table-ward
        :wards="wards"
        @handleUpdateEvent="updateEvent"
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
    this.getListWards();
  },

  mixins: [help],

  data() {
    return {
      isLoadingWard: false,
      wards: [],
      currentPage: 1,
      limit: 10,
      districtId: this.$auth.user.district_id,
      pageCount: 0,
      paramsReq: {},
      step: 1,
      rowIsSelected: {},
      actionType: 'add',
      countAll: 0,
      currentTotal: 0
    }
  },

  methods: {
    getListWards(type='filter') {
      if(type == 'filter') {
        this.currentPage = 1
      }

      this.isLoadingWard = true

      let paramRequired = {
        'page': this.currentPage,
        'limit': this.limit,
        'id': this.districtId
      }

      this.paramReq = paramRequired;
      this.$store.dispatch('ward/getListWards', paramRequired).then(response => {
        if (response.data.success) {
          this.wards = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.wards.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingWard = false;
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
      this.getListWards('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListWards('paginate');
    }
  }
}
</script>
