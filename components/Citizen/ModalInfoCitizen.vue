<template>
  <div class="modal xscreen-orders-detail" :id="'citizen-' + citizen.id" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chi tiết dân cư</h5>
        </div>
        <div class="modal-body">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col" style="width: 25%;">Căn cước</th>
              <th scope="col" style="width: 30%;">Họ và tên</th>
              <th scope="col" style="width: 20%;">Ngày sinh</th>
              <th scope="col" style="width: 20%;">Giới tính</th>
              <th scope="col" style="width: 20%;">Quê quán</th>
              <th scope="col" style="width: 20%;">Địa chỉ thường trú</th>
              <th scope="col" style="width: 20%;">Địa chỉ tạm trú</th>
              <th scope="col" style="width: 20%;">Tôn giáo</th>
              <th scope="col" style="width: 20%;">Trình độ học vấn</th>
              <th scope="col" style="width: 20%;">Nghề nghiệp</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{citizen.id_card}}</td>
              <td>{{citizen.fullname}}</td>
              <td>{{citizen.dob}}</td>
              <td>{{citizen.gender ? 'Nam' : 'Nữ'}}</td>
              <td>{{citizen.native_address}}</td>
              <td>{{citizen.permanent_address_province, citizen.permanent_address_district, citizen.permanent_address_ward, citizen.permanent_address_hamlet}}</td>
              <td>{{citizen.temp_address}}</td>
              <td>{{citizen.religion}}</td>
              <td>{{citizen.edu_level}}</td>
              <td>{{citizen.ocupation_name}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-close-ghtk" data-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerCustom from "../Common/SpinnerCustom.vue";
export default {
  name: "ModalInfoCitizen",
  components: {SpinnerCustom},
  props: [
    'citizen'
  ],

  data() {
    return {
      tmpCitizen: []
    }
  },

  watch: {
    citizen (val) {
      this.tmpCitizen = val
    }
  },
}
</script>

<style scoped lang="scss">
$color: #058f49;

.xscreen-orders-detail {
  .ico-square {
    font-size: 22px;
    cursor: pointer;
    color: $color;
  }

  table {
    td {
      vertical-align: unset;
    }
  }

  .btn-ghtk {
    background-color: $color;
    color: white;
    cursor: pointer;
  }

  .link-to-ecom {
    color: $color;
  }
}
</style>

<style>
</style>
