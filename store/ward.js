import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListWards({commit}, params) {
    return axios.get('ward/list', {params: params});
  },

  insertWard({commit}, params) {
    return axios.post('ward/insert', params);
  },

  updateWard({commit}, params) {
    return axios.post('ward/update', params);
  }
}
