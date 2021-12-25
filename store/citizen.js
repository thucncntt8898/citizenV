import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListCitizens({commit}, params) {
    return axios.get('citizen/list', {params: params});
  },

  insertCitizen({commit}, params) {
    return axios.post('citizen/insert', params);
  },

  updateCitizen({commit}, params) {
    return axios.post('citizen/update', params);
  },

  getListOccupations({commit}, params) {
    return axios.get('occupation/list', {params: params});
  }
}
