import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  getListUsers({commit}, params) {
    console.log(params);
    return axios.get('user/list', {params: params});
  },
}
