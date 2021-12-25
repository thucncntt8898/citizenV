import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListHamlets({commit}, params) {
    return axios.get('hamlet/list', {params: params});
  },

  insertHamlet({commit}, params) {
    return axios.post('hamlet/insert', params);
  },

  updateHamlet({commit}, params) {
    return axios.post('hamlet/update', params);
  }
}
