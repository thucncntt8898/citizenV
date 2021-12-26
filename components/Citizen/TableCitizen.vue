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
              <input type="text" class="form-control" placeholder="Nhập căn cước/CMT" v-model="formFilter.idCard">
            </div>
            <div class="col-sm-1 my-1 title-form">
              Họ và tên:
            </div>
            <div class="col-sm-5 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập họ tên" v-model="formFilter.fullname">
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
                :multiple="true"
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
              <input type="text" class="form-control" placeholder="Nhập quê quán" v-model="formFilter.nativeAddress">
            </div>
            <div class="col-sm-2 my-1 title-form">
              Địa chỉ tạm trú:
            </div>
            <div class="col-sm-5 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="Nhập địa chỉ tạm trú" v-model="formFilter.tempAddress">
            </div>
            <div class="col-sm-2 my-1 title-form">
              Địa chỉ thường trú:
            </div>
            <div class="col-sm-2 my-1 title-form">
              Tỉnh/thành phố:
            </div>
            <div class="col-sm-3 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.province.name" v-if="user.province_id" disabled>
              <vue-multiselect
                v-model="formFilter.permanentProvince"
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
            <div class="col-sm-3 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.district.name" v-if="user.district_id" disabled>
              <vue-multiselect
                v-model="formFilter.permanentDistrict"
                :options="districts"
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
            <div class="col-sm-2 my-1 filter-cod">
            </div>
            <div class="col-sm-2 my-1 title-form">
              Phường/xã:
            </div>
            <div class="col-sm-3 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.ward.name" v-if="user.ward_id" disabled>
              <vue-multiselect
                v-model="formFilter.permanentWard"
                :options="wards"
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
              Tổ dân phố/bản/thôn:
            </div>
            <div class="col-sm-3 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.hamlet.name" v-if="user.hamlet_id" disabled>
              <vue-multiselect
                v-model="formFilter.permanentHamlet"
                :options="hamlets"
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
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-12 my-1">
              <div v-if="user.role == 5 && checkUserPermission()">
                <button-custom
                  class="btn-add"
                  background-color="#058f49"
                  classIcon="fa fa-plus-circle"
                  buttonName="Thêm mới"
                  @submitEvent="create()"
                >
                </button-custom>
              </div>
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
        <th width="10%" v-if="user.role == 5">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(citizen, index) in citizens" :key="index">
        <td>{{citizen.id_card}}</td>
        <td>{{citizen.fullname}}</td>
        <td>{{citizen.dob}}</td>
        <td>{{citizen.gender == 0 ? 'Nữ' : 'Nam'}}</td>
        <td v-if="user.role == 5">
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
import {help} from "../../plugins/mixins/help.js";
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

  mixins: [help],

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
        'permanentProvince': [],
        'permanentDistrict': [],
        'permanentWard': [],
        'permanentHamlet': [],
      },
      genderTypes: [
        {id: 0, name: 'Nữ'},
        {id: 1, name: 'Nam'},
        {id: 2, name: 'Tất cả'},
      ],
      paramReq: {},
      listOccupations: [],
      user: this.$auth.user[0],
      provinces: [],
      districts: [],
      wards: [],
      hamlets: [],
      page: 1,
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
      this.$store.dispatch('user/getInfoAddresses', this.paramReq).then(response => {
        if (response.data.success) {
          let data = response.data.data;
          this.provinces = data.provinces != undefined ? data.provinces : [];
          this.districts = data.districts != undefined ? data.districts : [];
          this.wards = data.wards != undefined ? data.wards : [];
          this.hamlets = data.hamlets != undefined ? data.hamlets : [];
        } else {
          this.$toast.error('Lỗi.');
        }
      })
    },

    handleGoBackEvent() {
      this.step = 1;
      this.rowIsSelected = {};
      this.getListOccupations('paginate');
    },

    handleSelectPageEvent(page) {
      this.currentPage = page;
      this.getListOccupations('paginate');
    },

    filter(){
      let data = this.formFilter;

      let paramReq = {
        'id_card': data.idCard,
        'fullname': data.fullname,
        'dob': data.dob != '' ? moment(data.dob).format('YYYY-MM-DD') : '',
        'gender': data.gender.id,
        'native_address': data.nativeAddress,
        'temp_address': data.tempAddress,
        'permanent_address_province': this.user.province_id != null ? [this.user.province_id] :
          (data.permanentProvince != null ? data.permanentProvince.map(province => {return province.id}) : []),
        'permanent_address_district': this.user.district_id != null? [this.user.district_id] :
          (data.permanentDistrict != null ? data.permanentDistrict.map(district => {return district.id}) : []),
        'permanent_address_ward': this.user.ward_id != null? [this.user.ward_id] :
          (data.permanentWard != null ? data.permanentWard.map(ward => {return ward.id}) : []),
        'permanent_address_hamlet': this.user.hamlet_id != null? [this.user.hamlet_id] :
          (data.permanentHamlet != null ? data.permanentHamlet.map(hamlet => {return hamlet.id}) : []),
        'occupation': data.occupation != '' ? data.occupation.map(oc => {return oc.id}) : [],
        'page': 1,
        'limit': 10,
      }

      this.$emit('handleFilterCitizen', paramReq);
    },
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
