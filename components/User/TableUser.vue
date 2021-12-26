<template>
  <div id="config-xstar-table-main">
    <div id="form-search-main">
      <div class="card">
        <div class="card-body">
          <div class="form-row align-items-center">
            <div class="col-sm-2 my-1 title-form">
              Tỉnh/thành phố:
            </div>
            <div class="col-sm-4 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.province.name" v-if="user.province_id" disabled>
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
              <input type="text" class="form-control" placeholder="" v-model="user.district.name" v-if="user.district_id" disabled>
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
                v-else
              >
              </vue-multiselect>
            </div>
            <div class="col-sm-2 my-1 title-form">
              Phường/xã:
            </div>
            <div class="col-sm-4 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.ward.name" v-if="user.ward_id" disabled>
              <vue-multiselect
                v-model="wardsAreSelected"
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
            <div class="col-sm-4 my-1 filter-cod">
              <input type="text" class="form-control" placeholder="" v-model="user.hamlet.name" v-if="user.hamlet_id" disabled>
              <vue-multiselect
                v-model="hamletsAreSelected"
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
              <button-custom class="btn-filter" backgroundColor="#058f49" classIcon="fa fa-search" :is-spinner="isLoadingUser" @submitEvent="filter()" buttonName="Tìm kiếm"></button-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="10%">Username</th>
        <th width="10%">Tỉnh/thành phố</th>
        <th width="10%" v-if="user.role >= 2">Quận/huyện</th>
        <th width="10%" v-if="user.role >= 3">Phường/Xã</th>
        <th width="10%" v-if="user.role >= 4">Xóm/thôn/bản</th>
        <th width="10%">Trạng thái</th>
        <th width="25%">Thời gian khai báo</th>
        <th width="10%">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(userInfo, index) in users" :key="index">
        <td>{{userInfo.username}}</td>
        <td>{{userInfo.province_name}}</td>
        <td v-if="user.role >= 2">{{userInfo.district_name}}</td>
        <td v-if="user.role >= 3">{{userInfo.ward_name}}</td>
        <td v-if="user.role >= 4">{{userInfo.hamlet_name}}</td>
        <td>{{userInfo.status == true ? 'Mở' : 'Khóa'}}</td>
        <td>{{userInfo.time_start}} ~ {{userInfo.time_finish}}</td>
        <td>
            <button type="button" class="btn btn-apply-outline-ghtk" v-on:click="updateEvent(userInfo)"><i class="fa fa-edit"></i> Sửa</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "TableUser",
  props: [
    'users'
  ],

  data() {
    return {
      user: {},
      isLoadingUser: false,
      provincesAreSelected: '',
      districtsAreSelected: '',
      wardsAreSelected: '',
      hamletsAreSelected: '',
      provinces: [],
      districts: [],
      wards: [],
      hamlets: []
    }
  },

  created() {
    this.user = this.$auth.user[0];
    this.getInfoAddresses();
  },

  methods: {
    deleteEvent(index) {
      this.$swal({
        title: 'Bạn có muốn xóa config này không?',
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
    },

    updateEvent(data) {
      this.$emit('handleUpdateEvent', data)
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

    filter() {
      let paramReq = {

        'page': 1,
        'limit': 10,
      }

      this.$emit('handleFilterCitizen', paramReq);
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
