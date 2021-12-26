<template>
  <div id="manage-province-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý dân số</h4>
      </div>
    </div>
    <div v-if="step == 1">
      <table-citizen
        :citizens="citizens"
        @handleUpdateEvent="updateEvent"
        @handleAddCitizen="handleAddCitizen"
        @handleFilterCitizen="getListCitizens"
      ></table-citizen>
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
      <FormFilterCitizen
        :action-type="actionType"
        :rowIsSelected="rowIsSelected"
        :actionType="actionType"
        @goBackEvent="handleGoBackEvent"
      >
      </FormFilterCitizen>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormFilterCitizen from "./FormFilterCitizen.vue";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableCitizen from "./TableCitizen.vue";
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "MainCitizen",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableCitizen, FormFilterCitizen},

  created() {
  },

  mixins: [help],

  data() {
    return {
      isLoadingCitizen: false,
      citizens: [],
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
      hamlets: [],
      paramReq: {}
    }
  },

  methods: {
    handleAddCitizen() {
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
      this.getListCitizens(this.paramReq, 'paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListCitizens(this.paramReq, 'paginate');
    },

    getListCitizens(paramReq, type='filter') {
      this.isLoadingCitizen = true;
      this.paramReq = paramReq;
      if(type == 'filter') {
        this.currentPage = 1;
      }
      this.$store.dispatch('citizen/getListCitizens', this.paramReq).then(response => {
        if (response.data.success) {
          this.citizens = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.citizens.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingCitizen = false;
      })
    }
  }
}
</script>
