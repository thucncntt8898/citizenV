import axios from "./axiosConfig"

export const state = () => ({

})

export const mutations = {

}

export const actions = {
    loginHome({commit}, params) {
        return axios.post('auth/login', params)
    },

    getUser({commit}, token) {
        return axios.get('auth/get-user', {
            headers: {
                'Authorization': token
            }
        })
    },
}
