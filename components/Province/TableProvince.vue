<template>
  <div id="config-xstar-table-main">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="20%">Tên tỉnh/thành phố</th>
        <th width="15%">Code</th>
        <th width="15%">Số quận/huyện</th>
        <th width="15%">Số phường/xã</th>
        <th width="15%">Số thôn/bản/tổ dân phố</th>
        <th width="30%">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(province, index) in provinces" :key="index">
        <td>{{province.name}}</td>
        <td>{{province.code}}</td>
        <td>{{province.districts.length}}</td>
        <td>{{province.countWard}}</td>
        <td>{{province.countHamlet}}</td>
        <td>
          <div class="d-flex">
            <button type="button" class="btn btn-apply-outline-ghtk col-6" v-on:click="updateEvent(province)"><i class="fa fa-edit"></i> Sửa</button>
            <button type="button" class="btn btn-outline-danger col-6 ml-1" v-on:click="deleteEvent(index)"><i class="fa fa-trash"></i> Xóa</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "TableProvince",
  props: [
    'provinces'
  ],

  methods: {
    deleteEvent(index) {
      this.$swal({
        title: 'Bạn có muốn xóa config này không?',
      }).then((result) => {

      })
    },

    updateEvent(data) {
      this.$emit('handleUpdateEvent', data)
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
</style>
