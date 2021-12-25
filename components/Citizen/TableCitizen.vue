<template>
  <div id="table-citizen">
    <div id="form-search-main">
      <div class="card">
        <div class="card-body">
          <div class="form-row align-items-center">
            <div class="col-1 my-1 title-form">
              CMT:
            </div>
            <div class="col-sm-5 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập căn cước/CMT (cách nhau bởi dấu phẩy)" v-model="formFilter.idCard">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Họ và tên:
            </div>
            <div class="col-sm-5 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập họ tên (cách nhau bởi dấu phẩy)" v-model="formFilter.fullname">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Ngày sinh:
            </div>
            <div class="col-sm-3 my-1 filter-cod">
              <date-picker
                v-model="formFilter.dob"
                format="YYYY-MM-DD"
                type="date"
                placeholder="Nhập ngày sinh"
                :disabled-date="disabledAfterToday"
              ></date-picker>
            </div>
            <div class="col-sm-1 my-1 title-form">
              Giới tính:
            </div>
            <div class="col-sm-3 my-1 filter-cod">
              <vue-multiselect
                v-model="formFilter.gender"
                :options="genderTypes"
                :multiple="false"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                placeholder="Chọn giới tính"
                label="name"
                track-by="id"
              >
              </vue-multiselect>
            </div>
            <div class="col-sm-1 my-1 title-form">
              Nghề nghiệp:
            </div>
            <div class="col-sm-3 my-1 filter-cod">
              <vue-multiselect
                v-model="formFilter.occupation"
                :options="listOccupations"
                :multiple="false"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                placeholder="Chọn nghề nghiệp"
                label="name"
                track-by="id"
              >
              </vue-multiselect>
            </div>
            <div class="col-sm-1 my-1 title-form">
              Quê quán:
            </div>
            <div class="col-sm-4 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập quê quán (cách nhau bởi dấu phẩy)" v-model="formFilter.nativeAddress">
            </div>
            <div class="col-sm-2 my-1 title-form">
              Địa chỉ tạm trú:
            </div>
            <div class="col-sm-5 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập địa chỉ tạm trú (cách nhau bởi dấu phẩy)" v-model="formFilter.tempAddress">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Địa chỉ thường trú:
            </div>
            <div class="col-sm-1 my-1 title-form">
              Tỉnh/thành phố:
            </div>
            <div class="col-sm-2 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="formFilter.permanentProvince">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Quận/huyện:
            </div>
            <div class="col-sm-2 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="formFilter.permanentDistrict">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Phường/xã:
            </div>
            <div class="col-sm-2 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="formFilter.permanentWard">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Tổ dân phố/bản/thôn:
            </div>
            <div class="col-sm-2 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="formFilter.permanentHamlet">
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-12 my-1">
              <button-custom class="btn-add" background-color="#058f49" classIcon="fa fa-plus-circle" buttonName="Thêm mới" @submitEvent="create()"></button-custom>
              <button-custom class="btn-filter" backgroundColor="#058f49" classIcon="fa fa-search" :is-spinner="isLoadingCitizen" @submitEvent="filter()" buttonName="Tìm kiếm"></button-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="10%">Căn cước/CMT</th>
        <th width="10%">Họ và tên</th>
        <th width="10%">Ngày sinh</th>
        <th width="10%">Giới tính</th>
        <th width="10%">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(citizen, index) in citizens" :key="index">
        <td>{{citizen.id_card}}</td>
        <td>{{citizen.fullname}}</td>
        <td>{{citizen.dob}}</td>
        <td>{{citizen.gender == 0 ? 'Nữ' : 'Nam'}}</td>
        <td>
          <div class="d-flex">
            <button type="button" class="btn btn-apply-outline-ghtk col-6" v-on:click="updateEvent(citizen)"><i class="fa fa-edit"></i> Sửa</button>
            <button type="button" class="btn btn-outline-danger col-6 ml-1" v-on:click="deleteEvent(index)"><i class="fa fa-trash"></i> Xóa</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: "TableUser",
  props: [
    'citizens',
    'isLoadingCitizen'
  ],

  components: {
    DatePicker
  },

  created() {
    this.getListOccupations();
    this.getInfoAddresses();
  },

  data() {
    return {
      formFilter: {
        'idCard': '',
        'fullname': '',
        'dob': '',
        'gender': {id: 2, name: 'Tất cả'},
        'nativeAddress': '',
        'tempAddress': '',
        'occupation': [],
        'permanentProvince': {id:'', name: ''},
        'permanentDistrict': {id:'', name: ''},
        'permanentWard': {id:'', name: ''},
        'permanentHamlet': {id:'', name: ''},
      },
      genderTypes: [
        {id: 0, name: 'Nữ'},
        {id: 1, name: 'Nam'},
        {id: 2, name: 'Tất cả'},
      ],
      paramReq: {},
      listOccupations: [],
    }
  },

  methods: {
    deleteEvent(index) {
      this.$swal({
        title: 'Bạn có muốn xóa config này không?',
      }).then((result) => {
      })
    },

    updateEvent(data) {
      this.$emit('handleUpdateEvent', data)
    },

    create() {
      this.$emit('handleAddCitizen');
    },

    update() {

    },

    disabledAfterToday(date) {
      const today = new Date();
      return date > today;
    },

    getListOccupations() {
      this.paramReq = {
        name: this.formFilter.occupation
      }
      this.$store.dispatch('citizen/getListOccupations', this.paramReq).then(response => {
        if (response.data.success) {
          this.listOccupations = response.data.data;
        } else {
          this.$toast.error('Lỗi.');
        }
      })
    },

    getInfoAddresses() {

    },

    handleGoBackEvent() {
      this.step = 1;
      this.rowIsSelected = {};
      this.getListOccupations('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListOccupations('paginate');
    }
  }
}
</script>
<style scoped lang="scss">
table {
  thead > tr > th {
    text-align:  center;
  }

  tbody {
    tr > td {
      text-align: center;
    }
  }
}
#form-search-main {
  .btn-add {
    width: 150px;
    cursor: pointer;
    margin-top: 5px;
    margin-left: 10px;
    height: 40px;
    float: right;
  }

  .btn-download {
    cursor: pointer;
    margin-top: 5px;
    background-color: #058f49;
    width: 150px;
    color: white;
    height: 40px;
    padding-top: 11px;
    float: right;
  }

  .btn-filter {
    width: 150px;
    cursor: pointer;
    float: right;
    margin-top: 5px;
    height: 40px;
    margin-right: 10px;
  }

  .fa-download {
    padding-right: 5px;
  }

  .title-form {
    font-weight: 600;
  }

  .card {
    border-radius: 3px;
  }
}
</style>
