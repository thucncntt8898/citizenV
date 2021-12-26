import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListUsers({commit}, params) {
    return axios.get('user/list', {params: params});
  },

  updateUser({commit}, params) {
    return axios.post('user/update', params);
  },

  getInfoAddresses({commit}, params) {
    return axios.get('user/get-info-address');
  }
}
