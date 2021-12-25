<template>
  <div id="config-xstar-table-main">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th width="20%">Tên thôn/bản/tổ dân phố</th>
        <th width="15%">Code</th>
        <th width="30%">Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(hamlet, index) in hamlets" :key="index">
        <td>{{hamlet.name}}</td>
        <td>{{hamlet.code}}</td>
        <td>
          <div class="d-flex">
            <button type="button" class="btn btn-apply-outline-ghtk col-6" v-on:click="updateEvent(hamlet)"><i class="fa fa-edit"></i> Sửa</button>
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
  name: "TableHamlet",
  props: [
    'hamlets'
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
