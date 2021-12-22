<template>
  <div id="manage-province-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý tỉnh/thành phố</h4>
      </div>
      <div class="col-2 filter-area mb-1">
        <button-custom class="btn-add" classIcon="fa fa-plus-circle" buttonName="Thêm mới" @submitEvent="createEvent()"></button-custom>
      </div>
    </div>
    <div v-if="step == 1">
      <table-province
        :provinces="provinces"
        @handleUpdateEvent="updateEvent"
      ></table-province>
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
import FormFilterProvince from "./FormFilterProvince.vue";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableProvince from "./TableProvince.vue";
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "MainProvince",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableProvince, FormFilterProvince},

  created() {
    this.getListProvinces();
  },

  mixins: [help],

  data() {
    return {
      isLoadingProvince: false,
      provinces: [],
      currentPage: 1,
      limit: 10,
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
    getListProvinces(type='filter') {
      if(type == 'filter') {
        this.currentPage = 1
      }

      this.isLoadingProvince = true

      let paramRequired = {
        'page': this.currentPage,
        'limit': this.limit
      }

      this.paramReq = paramRequired;
      this.$store.dispatch('province/getListProvinces', paramRequired).then(response => {
        if (response.data.success) {
          this.provinces = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.provinces.length;
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
      this.getListProvinces('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListProvinces('paginate');
    }
  }
}
</script>
