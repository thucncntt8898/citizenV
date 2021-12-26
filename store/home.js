import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getStatisticalData({commit}) {
    return axios.get('home');
  },
}
