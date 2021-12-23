<template>
  <div id="form-config-xstar-id">
    <div class="row update-header">
      <i class="ico-go-back fa fa-arrow-left" title="Quay lại" v-on:click="goBack"></i>
      <h5 class="">{{actionType == 'add' ? 'Thêm mới' : 'Chỉnh sửa'}}</h5>
    </div>
    <div class="container">
      <div class="card create-card-main">
        <div class="card-body">
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Tên tỉnh/thành phố
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" id="province" placeholder="Nhập tên tỉnh/thành phố" v-model="name">
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Mã code
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" id="campaign" placeholder="Nhập mã code" v-model="code">
            </div>
          </div>
          <button-custom class="btn button-save" :is-spinner="isActionLoading" classIcon="fa fa-save" buttonName="Lưu" @submitEvent="actionType == 'add' ? onAdd(): onEdit()" ></button-custom>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import {help} from "../../plugins/mixins/help"
export default {
  name: "FormFilterUser",

  props: [
    'actionType',
    'rowIsSelected'
  ],

  components: {
    DatePicker
  },

  mixins: [help],

  data() {
    return {
      isLoading: false,
      isActionLoading: false,
      name: '',
      code: ''
    }
  },

  created() {
    if (this.actionType == 'edit') {
      this.name = this.rowIsSelected.name;
      this.code = this.rowIsSelected.code;
    }
  },

  methods: {

    onAdd() {
      this.createOrUpdate('province/insertProvince');
    },

    onEdit() {
      this.createOrUpdate('province/updateProvince');
    },

    createOrUpdate(url) {
      this.isActionLoading = true;

      let formData = new FormData()
      if (this.actionType == 'edit') {
        formData.set('id', this.rowIsSelected.id);
      }

      formData.set('name', this.name);
      formData.set('code', this.code);

      this.$store.dispatch(url, formData).then(response => {
        if (response.data.success) {
          this.goBack();
          this.$toast.success(response.data.message);
        } else {
          this.$toast.error(response.data.message);
        }
        this.isActionLoading = false;
      })
    },

    goBack() {
      this.$emit('goBackEvent');
    },
  }
}
</script>
<style scoped lang="scss">
$ghtk_color: #058f49;
.button-save {
  float: right;
  width: 100px;
  background-color: $ghtk_color;
}

.create-card-main {
  margin-top: 20px;
}

.title-form {
  font-weight: 600;
}

.space {
  text-align: center;
  font-size: 20px;
}

.update-header {
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0rem;
  background: $ghtk_color;
  position: relative;
  color: white;
  margin-bottom: 1rem;

  h5 {
    margin-bottom: unset;
  }

  .ico-go-back {
    position: absolute;
    left : 1rem;
    cursor: pointer;
    font-size: 20px;
  }

  .spinner-custom {
    margin-left: 5px;
    margin-bottom: 1px;
  }
}
</style>
