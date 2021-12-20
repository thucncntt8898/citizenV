import Vue from 'vue'
import Multiselect from "vue-multiselect";
import vSelect from 'vue-select'
import Paginate from 'vuejs-paginate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = {
    confirmButtonColor: '#058f49',
    cancelButtonColor: '#DC143C',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy',
    showCancelButton: true,
    customClass: {
        cancelButton: 'order-1',
        confirmButton: 'order-2',
    }
};
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);
Vue.use(VueSweetalert2,options);
Vue.component('vue-multiselect', Multiselect);
Vue.component('v-select', vSelect)
Vue.component('vue-paginate', Paginate)
