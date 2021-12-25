<template>
  <div id="manage-hamlet-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Quản lý thôn/bản/tổ dân phố </h4>
      </div>
      <div class="col-2 filter-area mb-1">
        <button-custom class="btn-add" classIcon="fa fa-plus-circle" buttonName="Thêm mới" @submitEvent="createEvent()"></button-custom>
      </div>
    </div>
    <div v-if="step == 1">
      <table-hamlet
        :hamlets="hamlets"
        @handleUpdateEvent="updateEvent"
      ></table-hamlet>
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
      <FormFilterHamlet
        :action-type="actionType"
        :rowIsSelected="rowIsSelected"
        :actionType="actionType"
        @goBackEvent="handleGoBackEvent"
      >
      </FormFilterHamlet>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormFilterHamlet from "./FormFilterHamlet.vue";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableHamlet from "./TableHamlet.vue";
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "MainHamlet",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableHamlet, FormFilterHamlet},

  created() {
    this.getListHamlets();
  },

  mixins: [help],

  data() {
    return {
      isLoadingHamlet: false,
      hamlets: [],
      currentPage: 1,
      limit: 10,
      wardId: this.$auth.user.ward_id,
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
    getListHamlets(type='filter') {
      if(type == 'filter') {
        this.currentPage = 1
      }

      this.isLoadingHamlet = true

      let paramRequired = {
        'page': this.currentPage,
        'limit': this.limit,
        'id': this.wardId
      }

      this.paramReq = paramRequired;
      this.$store.dispatch('hamlet/getListHamlets', paramRequired).then(response => {
        if (response.data.success) {
          this.hamlets = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.hamlets.length;
          this.countAll = total;
          this.pageCount = this.getPageCount(total, this.limit);
        } else {
          this.$toast.error('Lỗi.');
        }
        this.isLoadingHamlet = false;
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
      this.getListHamlets('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListHamlets('paginate');
    }
  }
}
</script>
