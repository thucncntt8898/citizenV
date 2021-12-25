import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListDistricts({commit}, params) {
    return axios.get('district/list', {params: params});
  },

  insertDistrict({commit}, params) {
    return axios.post('district/insert', params);
  },

  updateDistrict({commit}, params) {
    return axios.post('district/update', params);
  }
}
