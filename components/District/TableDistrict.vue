<template>
  <div id="district-table-main">
    <div id="form-search-main">
      <div class="card">
        <div class="card-body">
          <div class="form-row align-items-center">
            <div class="col-sm-2 my-1 title-form">
              Tỉnh/thành phố:
            </div>
            <div class="col-sm-4 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.province.name"
                     v-if="user.province_id" disabled>
              <vue-multiselect
                v-model="provincesAreSelected"
                :options="provinces"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                placeholder="Chọn thôn/bản/tổ dân phố"
                label="name"
                track-by="id"
                v-else
              >
              </vue-multiselect>
            </div>
            <div class="col-sm-2 my-1 title-form">
              Quận/huyện:
            </div>
            <div class="col-sm-4 my-1 filter-cod">
              <vue-multiselect
                v-model="districtsAreSelected"
                :options="districts"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                placeholder="Chọn thôn/bản/tổ dân phố"
                label="name"
                track-by="id"
              >
              </vue-multiselect>
            </div>
            <div class="col-sm-2 my-1 title-form">
              Code:
            </div>
            <div class="col-sm-4 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập mã code" v-model="code">
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-12 my-1">
              <button-custom class="btn-add" v-if="this.showAction" classIcon="fa fa-plus-circle" buttonName="Thêm mới"
                             @submitEvent="createEvent()"></button-custom>
              <button-custom class="btn-filter" backgroundColor="#058f49" classIcon="fa fa-search"
                             :is-spinner="isLoadingDistrict" @submitEvent="filter()"
                             buttonName="Tìm kiếm"></button-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="20%">Tên quận/huyện</th>
        <th width="15%">Code</th>
        <th width="15%">Số phường/xã</th>
        <th width="15%">Số thôn/bản/tổ dân phố</th>
        <th width="30%" v-if="user.role == 2 && checkUserPermission()">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(district, index) in listDistricts" :key="index">
        <td>{{ district.name }}</td>
        <td>{{ district.code }}</td>
        <td>{{ district.wards.length }}</td>
        <td>{{ district.countHamlet }}</td>
        <td v-if="user.role == 2 && checkUserPermission()">
          <div class="d-flex">
            <button type="button" class="btn btn-apply-outline-ghtk col-6" v-on:click="updateEvent(district)"><i
              class="fa fa-edit"></i> Sửa
            </button>
            <button type="button" class="btn btn-outline-danger col-6 ml-1" v-on:click="deleteEvent(index)"><i
              class="fa fa-trash"></i> Xóa
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {help} from "../../plugins/mixins/help.js";

export default {
  name: "TableDistrict",
  props: [
    'listDistricts',
    'isLoadingDistrict',
  ],

  data() {
    return {
      user: {},
      code: '',
      showAction: this.getShowAction(),
    }
  },

  mixins: [help],

  methods: {
    getShowAction() {
      return this.$auth.user[0].role === 2;
    },
    deleteEvent(index) {
      this.$swal({
        title: 'Bạn có muốn xóa config này không?',
      }).then((result) => {

      })
    },

    updateEvent(data) {
      this.$emit('handleUpdateEvent', data)
    },

    filter() {
      let paramReq = {
        'province_ids': this.provincesAreSelected != '' ? this.provincesAreSelected.map(province => {return province.id}) : [],
        'district_ids': this.districtsAreSelected != '' ? this.districtsAreSelected.map(province => {return province.id}) : [],
        'code': this.code
      };

      this.$emit('handleFilter', paramReq)
    },

    createEvent() {
      this.$emit('handleCreateEvent');
    }
  }
}
</script>
<style scoped lang="scss">
table {
  thead > tr > th {
    text-align: center;
  }

  tbody {
    tr > td {
      text-align: center;
    }
  }
}
</style>
