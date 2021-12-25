<template>
  <div id="config-xstar-table-main">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="10%">Username</th>
        <th width="10%">Tỉnh/thành phố</th>
        <th width="10%" v-if="role >= 2">Quận/huyện</th>
        <th width="10%" v-if="role >= 3">Phường/Xã</th>
        <th width="10%" v-if="role >= 4">Xóm/thôn/bản</th>
        <th width="10%">Trạng thái</th>
        <th width="25%">Thời gian khai báo</th>
        <th width="10%">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{user.username}}</td>
        <td>{{user.province_name}}</td>
        <td v-if="role >= 2">{{user.district_name}}</td>
        <td v-if="role >= 3">{{user.ward_name}}</td>
        <td v-if="role >= 4">{{user.hamlet_name}}</td>
        <td>{{user.status == 1 ? 'Mở' : 'Khóa'}}</td>
        <td>{{user.time_start}} ~ {{user.time_finish}}</td>
        <td>
            <button type="button" class="btn btn-apply-outline-ghtk" v-on:click="updateEvent(user)"><i class="fa fa-edit"></i> Sửa</button>
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

  data() {
    return {
      'role': 0,
    }
  },

  created() {
    this.role = this.$auth.user[0].role;
  },

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
