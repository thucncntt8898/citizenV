<template>
  <div id="form-config-xstar-id">
    <div class="row update-header">
      <i class="ico-go-back fa fa-arrow-left" title="Quay lại" v-on:click="goBack"></i>
      <h5>{{actionType == 'add' ? 'Thêm mới' : 'Chỉnh sửa'}}</h5>
    </div>
    <div class="container">
      <div class="card create-card-main">
        <div class="card-body">
          <span class="error-span" v-if="errorInputs.permanent_address_hamlet">{{errorInputs.permanent_address_hamlet}}</span>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              CMT/CCCD
            </div>
            <div class="col-sm-9 my-1">
              <input type="text"
                     class="form-control mb-2 mr-sm-2" placeholder="Nhập tên CMT/CCCD" v-model="idCard" :class="errorInputs.id_card ? 'error-input' : ''">
              <span class="error-span" v-if="errorInputs.id_card">{{errorInputs.id_card}}</span>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
             Họ và tên
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Nhập họ tên" v-model="fullname" :class="errorInputs.fullname ? 'error-input' : ''">
              <span class="error-span" v-if="errorInputs.fullname">{{errorInputs.fullname}}</span>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Ngày sinh
            </div>
            <div class="col-sm-9 my-1">
              <date-picker
                v-model="dob"
                format="YYYY-MM-DD"
                type="date"
                placeholder="Nhập ngày sinh"
                :disabled-date="disabledAfterToday"
                :class="errorInputs.dob ? 'error-input' : ''"
              ></date-picker>
              <span class="error-span" v-if="errorInputs.dob">{{errorInputs.dob}}</span>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Giới tính
            </div>
            <div class="col-sm-9 my-1">
              <vue-multiselect
                v-model="gender"
                :options="genderTypes"
                :multiple="false"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                placeholder="Chọn giới tính"
                label="name"
                track-by="id"
                :class="errorInputs.gender ? 'error-input' : ''"
              >
              </vue-multiselect>
              <span class="error-span" v-if="errorInputs.gender">{{errorInputs.gender}}</span>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Quê quán
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Nhập quê quán" v-model="nativeAddress" :class="errorInputs.native_address">
              <span class="error-span" v-if="errorInputs.native_address">{{errorInputs.native_address}}</span>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Địa chỉ thường trú
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" :placeholder="permanentAddress" disabled>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Địa chỉ tạm trú
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Nhập địa chỉ tạm trú" v-model="tempAddress" :class="errorInputs.temp_address">
              <span class="error-span" v-if="errorInputs.temp_address">{{errorInputs.temp_address}}</span>
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Tôn giáo
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Nhập tôn giáo" v-model="religion">
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Trình độ văn hóa
            </div>
            <div class="col-sm-9 my-1">
              <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Nhập trình độ văn hóa" v-model="eduLevel">
            </div>
          </div>
          <div class="form-row align-items-center">
            <div class="col-sm-3 my-1 title-form">
              Nghề nghiệp
            </div>
            <div class="col-sm-9 my-1">
              <vue-multiselect
                v-model="occupation"
                :options="listOccupations"
                :multiple="false"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                placeholder="Chọn nghề nghiệp"
                label="name"
                track-by="id"
                :class="errorInputs.occupation ? 'error-input' : ''"
              >
              </vue-multiselect>
              <span class="error-span" v-if="errorInputs.occupation">{{errorInputs.occupation}}</span>
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
import ButtonCustom from "../Common/ButtonCustom.vue";
export default {
  name: "FormFilterCitizen",

  props: [
    'actionType',
    'rowIsSelected',
    'citizen',
    'occupations'
  ],

  components: {
    DatePicker,
    ButtonCustom
  },

  mixins: [help],

  data() {
    return {
      isLoading: false,
      isActionLoading: false,
      idCard: '',
      fullname: '',
      dob: '',
      gender: {id: 0, name: 'Nữ'},
      nativeAddress: '',
      tempAddress: '',
      religion: '',
      eduLevel: '',
      occupation: '',
      genderTypes: [
        {id: 0, name: 'Nữ'},
        {id: 1, name: 'Nam'},
      ],
      permanentAddress: this.$auth.user[0]['hamlet']['name'] + ', ' + this.$auth.user[0]['ward']['name'] + ', ' + this.$auth.user[0]['district']['name'] + ', ' + this.$auth.user[0]['province']['name'],
      listOccupations: this.occupations,
      errorInputs: {
        id_card: '',
        fullname: '',
        dob: '',
        gender: '',
        native_address: '',
        temp_address: '',
        religion: '',
        eduLevel: '',
        occupation: '',
        permanent_address_hamlet: '',
      }
    }
  },

  created() {
    if (this.actionType == 'edit') {
      this.idCard = this.rowIsSelected.id_card;
      this.fullname = this.rowIsSelected.fullname;
      this.dob = new Date(moment(this.rowIsSelected.dob).format('YYYY-MM-DD'));
      this.gender = this.rowIsSelected.gender == 0 ? this.genderTypes[0] : this.genderTypes[1];
      this.nativeAddress = this.rowIsSelected.native_address;
      this.tempAddress = this.rowIsSelected.temp_address;
      this.religion = this.rowIsSelected.religion;
      this.eduLevel = this.rowIsSelected.edu_level;
      this.occupation = this.occupations.filter(oc => {return oc.id == this.rowIsSelected.occupation})[0];
    }
  },

  methods: {
    onAdd() {
      this.createOrUpdate('citizen/insertCitizen');
    },

    onEdit() {
      this.createOrUpdate('citizen/updateCitizen');
    },

    async createOrUpdate(url) {
      this.isActionLoading = true;

      let formData = new FormData();
      if (this.actionType == 'edit') {
        formData.set('id', this.rowIsSelected.id);
      }

      formData.set('id_card', this.idCard);
      formData.set('fullname', this.fullname);
      formData.set('dob', this.dob == '' ? '' : moment(this.dob).format('YYYY-MM-DD'));
      formData.set('gender', this.gender.id);
      formData.set('native_address', this.nativeAddress);
      formData.set('temp_address', this.tempAddress);
      formData.set('permanent_address_province', this.$auth.user[0].province_id);
      formData.set('permanent_address_district', this.$auth.user[0].district_id);
      formData.set('permanent_address_ward', this.$auth.user[0].ward_id);
      formData.set('permanent_address_hamlet', this.$auth.user[0].hamlet_id);
      formData.set('occupation', this.fullname);
      formData.set('edu_level', this.eduLevel);
      formData.set('religion', this.religion);

      this.$store.dispatch(url, formData).then(response => {
        if (response.data.success) {
          this.goBack();
          this.$toast.success(response.data.message);
        } else {
          let errors = response.data.errors;
          let fields = ['id_card', 'gender', 'fullname', 'dob', 'edu_level', 'occupation', 'religion', 'native_address', 'temp_address', 'permanent_address_hamlet'];
          fields.forEach(field => {
            if (errors[field]) {
              this.errorInputs[field] = errors[field][0];
            }
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.isActionLoading = false;
    },

    goBack() {
      this.$emit('goBackEvent');
    },

    disabledAfterToday(date) {
      const today = new Date();
      return date > today;
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

.error-span {
  font-size: 12px;
  font-style: italic;
  color: red;
}

.error-input {
  border-color: red;
}
</style>
