<template>
  <div id="config-xstar-table-main">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="10%">ID</th>
        <th width="10%">Username</th>
        <th width="10%">Tỉnh/thành phố</th>
        <th width="10%">Quận/huyện</th>
        <th width="10%">Phường/Xã</th>
        <th width="10%">Xóm/thôn/bản</th>
        <th width="10%">Trạng thái</th>
        <th width="10%">Thời gian khai báo</th>
        <th width="20%">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{user.id}}</td>
        <td>{{user.username}}</td>
        <td>{{user.province_name}}</td>
        <td>{{user.district_name}}</td>
        <td>{{user.ward_name}}</td>
        <td>{{user.hamlet_name}}</td>
        <td>{{user.status == 1 ? 'Mở' : 'Khóa'}}</td>
        <td>{{user.time_start}} ~ {{user.time_finish}}</td>
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
  name: "TableUser",
  props: [
    'users'
  ],

  methods: {
    deleteEvent(index) {
      this.$swal({
        title: 'Bạn có muốn xóa config này không?',
      }).then((result) => {
        if (result.isConfirmed) {
          let params = {
            'id': this.configs[index]['id']
          }
          this.$store.dispatch('configXstar/deleteConfigXstar', params).then(response => {
            if (response.data.success) {
              this.$toast.success(response.data.message)
              this.configs.splice(index, 1);
            } else {
              this.$toast.error(response.data.success)
            }
          })
        }
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
