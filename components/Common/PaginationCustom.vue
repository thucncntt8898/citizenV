<template>
  <div class="row pagination-custom" v-if="pageCount > 1">
    <vue-paginate
      v-model="page"
      :page-count="pageCount"
      :page-range="3"
      :margin-pages="2"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :active-class="'page-active'"
      :force-page="page"
      :click-handler="clickCallback"
      :page-class="'page-item'">
                                <span slot="breakViewContent">
                                  <svg width="16" height="4" viewBox="0 0 16 4">
                                    <circle fill="#999999" cx="2" cy="2" r="2"/>
                                    <circle fill="#999999" cx="8" cy="2" r="2"/>
                                    <circle fill="#999999" cx="14" cy="2" r="2"/>
                                  </svg>
                                </span>
    </vue-paginate>
  </div>
</template>

<script>
export default {
  name: "PaginationCustom",

  props: [
    'currentPage',
    'pageCount'
  ],

  data() {
    return {
      page: this.currentPage
    }
  },

  watch: {
    currentPage(val) {
      this.page = val
    }
  },

  methods: {
    clickCallback(page) {
      this.$emit('selectPageEvent', page)
    }
  }
}
</script>

<style>
.pagination-custom ul.pagination {
  margin-bottom: unset;
}

.pagination-custom ul.pagination li a {
  padding: 0.3rem !important;
  border: 1px solid rgb(180, 180, 180);
  min-width: 2rem;
  height: 2rem;
  margin-left: 0.2rem;
  display: flex;
  text-align: center;
  justify-content: center;
  vertical-align: middle;
  color: rgb(120, 120, 120);
  font-size: 14px;
  transition: all 0.5s;
}

.pagination-custom ul.pagination li a:hover {
  text-decoration: unset;
}

.pagination-custom ul.pagination li.page-item a {
  min-width: 2rem;
}

.pagination-custom ul.pagination li:first-child a, .pagination-custom ul.pagination li:last-child a {
  width: 4rem;
}

.pagination-custom ul.pagination li a:active, .pagination-custom ul.pagination li a:hover, .pagination-custom ul.pagination li.page-active a {
  background-color: #069255;
  color: white;
  outline: unset;
}

.pagination-custom ul.pagination li a:focus {
  border-color: #069255;
  outline: unset;
}

.pagination-custom {
  justify-content: flex-end;
  margin-top: 0.65rem;
}
</style>
