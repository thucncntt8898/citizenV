<template>
  <div id="manage-home-id">
    <div class="row" v-if="step == 1">
      <div class="col-10 filter-area mb-1">
        <h4>Tình hình nhập liệu</h4>
      </div>

    </div>
    <div v-if="step == 1">
      <table-ranking
        :homes="data"
        @handleUpdateEvent="updateEvent"
      ></table-ranking>
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

  </div>
</template>

<script>
import moment from "moment";
import PaginationCustom from "../Common/PaginationCustom.vue";
import showTextEntries from "../Common/showTextEntries.vue";
import TableRanking from "./TableRanking.vue";
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "MainHome",

  asyncData(context) {
    context.store.dispatch('localStorage/setOperationCategoriesIndex', 1)
  },

  middleware: 'authenticated',

  components: {TableRanking},

  created() {
    this.getStatisticalData();
  },

  mixins: [help],

  data() {
    return {
      isLoadingHamlet: false,
      data: [],
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
    getStatisticalData(type='filter') {
      if(type == 'filter') {
        this.currentPage = 1
      }

      this.isLoadingHamlet = true

      let paramRequired = {
        'page': this.currentPage,
        'limit': this.limit,
      }

      this.paramReq = paramRequired;
      this.$store.dispatch('home/getStatisticalData').then(response => {
        if (response.data.success) {
          console.log(123);
          this.data = response.data.data.data_list;
          let total = response.data.data.count;
          this.currentTotal = this.data.length;
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
      this.getStatisticalData('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getStatisticalData('paginate');
    }
  }
}
</script>
