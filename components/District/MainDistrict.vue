<template>
  <div id="manage-district-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý quận huyện </h4>
      </div>
      <div class="col-2 filter-area mb-1">
        <button-custom class="btn-add" classIcon="fa fa-plus-circle" buttonName="Thêm mới" @submitEvent="createEvent()"></button-custom>
      </div>
    </div>
    <div v-if="step == 1">
      <table-district
        :districts="districts"
        @handleUpdateEvent="updateEvent"
      ></table-district>
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
      <FormFilterDistrict
        :action-type="actionType"
        :rowIsSelected="rowIsSelected"
        :actionType="actionType"
        @goBackEvent="handleGoBackEvent"
      >
      </FormFilterDistrict>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormFilterDistrict from "./FormFilterDistrict.vue";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableDistrict from "./TableDistrict.vue";
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "MainDistrict",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableDistrict, FormFilterDistrict},

  created() {
    this.getListDistricts();
  },

  mixins: [help],

  data() {
    return {
      isLoadingDistrict: false,
      districts: [],
      currentPage: 1,
      limit: 10,
      province_id: this.$auth.user.province_id,
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
    getListDistricts(type='filter') {
      if(type == 'filter') {
        this.currentPage = 1
      }

      this.isLoadingDistrict = true

      let paramRequired = {
        'page': this.currentPage,
        'limit': this.limit,
        'id': this.province_id
      }

      this.paramReq = paramRequired;
      this.$store.dispatch('district/getListDistricts', paramRequired).then(response => {
        if (response.data.success) {
          this.districts = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.districts.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingDistrict = false;
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
      this.getListDistricts('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListDistricts('paginate');
    }
  }
}
</script>
