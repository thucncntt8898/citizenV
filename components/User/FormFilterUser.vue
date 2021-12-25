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
            <div class="col-sm-2 my-1 title-form">
              Mật khẩu
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" id="province" placeholder="Nhập password" v-model="password">
            </div>
          </div>
          <div class="form-row align-items-center mt-3">
            <div class="col-sm-2 my-1 title-form">
              Trạng thái
            </div>
            <div class="col-sm-9 my-1">
              <toggle-button
                :value="status"
                @change="onChangeEventHandler"
                :labels="{checked: 'Mở', unchecked: 'Khóa'}"
                width=65
                height=30
                font-size=12
              >
              </toggle-button>
            </div>
          </div>
          <div class="form-row align-items-center mt-3">
            <div class="col-sm-2 my-1 title-form">
              Thời gian khai báo
            </div>
            <div class="col-sm-1 my-1 title-form">
              Bắt đầu
            </div>
            <div class="col-sm-3 my-1">
              <date-picker
                v-model="start"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                placeholder="Nhập ngày bắt đầu"
              ></date-picker>
            </div>
            <span style="font-size: 20px; font-weight: bold" class="ml-3">~</span>
            <div class="col-sm-1 my-1 title-form ml-3">
              Kết thúc
            </div>
            <div class="col-sm-3 my-1">
              <date-picker
                v-model="finish"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                placeholder="Nhập ngày kết thúc"
              ></date-picker>
            </div>
          </div>
          <button-custom class="btn button-save" :is-spinner="isActionLoading" classIcon="fa fa-save" buttonName="Lưu" @submitEvent="onEdit()" ></button-custom>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import {help} from "../../plugins/mixins/help";
import {ToggleButton} from 'vue-js-toggle-button';

export default {
  name: "FormFilterUser",

  props: [
    'actionType',
    'rowIsSelected'
  ],

  components: {
    DatePicker,
    ToggleButton
  },

  mixins: [help],

  data() {
    return {
      isLoading: false,
      isActionLoading: false,
      password: '',
      status: '',
      start: '',
      finish: ''
    }
  },

  created() {
    if (this.actionType == 'edit') {
      this.status = this.rowIsSelected.status;
      this.start = new Date(moment(this.rowIsSelected.time_start).format('YYYY-MM-DD HH:mm:ss'));
      this.finish = new Date(moment(this.rowIsSelected.time_finish).format('YYYY-MM-DD HH:mm:ss'));
    }
  },

  methods: {
    onEdit() {
      this.createOrUpdate('user/updateUser');
    },

    createOrUpdate(url) {
      this.isActionLoading = true;

      let formData = new FormData();
      if (this.actionType == 'edit') {
        formData.append('user_id', this.rowIsSelected.id);
      }

      formData.append('password', this.password);
      formData.append('status', this.status == true ? 1 : 0);
      formData.append('time_start', moment(this.start).format('YYYY-MM-DD HH:mm:ss'));
      formData.append('time_finish', moment(this.finish).format('YYYY-MM-DD HH:mm:ss'));
      console.log(formData.get('time_start'));
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

    onChangeEventHandler(value) {
      this.status = value.value;
    }
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
