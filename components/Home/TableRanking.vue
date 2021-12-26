<template>
  <div id="config-xstar-table-main">
    <table class="rwd-table">
      <tr>
        <th>Top</th>
        <th>Tên {{this.modelLabel}}</th>
        <th>Code</th>
        <th>Số dân cư đã khai báo</th>
      </tr>
      <tr v-for="(model, index) in homes" :key="index" v-if="index.length <= 2">
        <td>{{Number(index) + 1}}</td>
        <td>{{model.name}}</td>
        <td>{{model.code}}</td>
        <td>{{model.total_citizens}} </td>
      </tr>
    </table>

    <div class="list-status-statistical">
      <a class="text-success" href="/province">Số {{ this.modelLabel }} đã hoàn thành khai báo: {{homes.done}}</a><br>
      <a class="text-primary" href="/province">Số {{ this.modelLabel }} đang thực hiện khai báo: {{homes.doing}}</a><br>
      <a class="text-danger" href="/province">Số {{ this.modelLabel }} chưa thực hiện khai báo: {{homes.todo}}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "TableRanking",
  props: [
    'homes'
  ],
  created() {
    this.getModelLabel();
  },
  data() {
    return {
      modelLabel: '',
    }
  },

  methods: {
    getModelLabel() {
      console.log(this.$auth.user[0].role);
      switch (this.$auth.user[0].role) {
        case 1:
            this.modelLabel = 'Tỉnh / Thành Phố';
            break;
        case 2:
            this.modelLabel = 'Quận / Huyện';
            break;
        case 3:
          this.modelLabel = 'Xã / Phường';
          break;
        case 4:
          this.modelLabel = 'Thôn / Xóm / Tổ dân phố'
          break;
      }

    },
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

<style type="text/css">

.list-status-statistical {
  margin: 1em 2em;
  min-width: 90%;
  font-weight: bold;
}

.list-status-statistical a{
  text-decoration: none;

}


.rwd-table {
  min-width: 90%;
  margin: 1em 2em;
}

.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.rwd-table th {
  display: none;
}
.rwd-table td {
  display: block;
}
.rwd-table td:first-child {
  padding-top: .5em;
}
.rwd-table td:last-child {
  padding-bottom: .5em;
}
.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 9.5em;
  display: inline-block;
}
@media (min-width: 480px) {
  .rwd-table td:before {
    display: none;
  }
}
.rwd-table th, .rwd-table td {
  text-align: left;
}
@media (min-width: 480px) {
  .rwd-table th, .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child, .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child, .rwd-table td:last-child {
    padding-right: 0;
  }
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495E;
}

.rwd-table {
  background: #34495E;
  color: #fff;
  border-radius: .4em;
  overflow: hidden;
}
.rwd-table tr {
  border-color: #46627f;
}
.rwd-table th, .rwd-table td {
  margin: .5em 1em;
}
@media (min-width: 480px) {
  .rwd-table th, .rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th, .rwd-table td:before {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

</style>
