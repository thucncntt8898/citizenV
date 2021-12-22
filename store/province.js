import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListProvinces({commit}, params) {
    return axios.get('province/list', {params: params});
  },

  insertProvince({commit}, params) {
    return axios.post('province/insert', params);
  }
}
