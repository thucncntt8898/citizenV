export const state = () => ({
    currentCategoryIndex: 0,
    currentCategoryOptionIndex: -1,
    routesPermission: [],
    operationCategoriesIndex: 0,
})

export const getters = {

}

export const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  }
}

export const mutations = {
    setCurrentCategoryIndex(state, currentCategoryIndex) {
        state.currentCategoryIndex = currentCategoryIndex;
    },

    setCurrentCategoryOptionIndex(state, currentCategoryOptionIndex) {
        state.currentCategoryOptionIndex = currentCategoryOptionIndex
    },

    reset(state) {

    },

    setOperationCategoriesIndex(state, operationCategoriesIndex) {
        state.operationCategoriesIndex = operationCategoriesIndex
    },

    setUser(state, user) {
        state.user = user
    },
}

export const actions = {
    setCurrentCategoryIndex({commit}, currentCategoryIndex) {
        commit('setCurrentCategoryIndex', currentCategoryIndex);
    },

    setCurrentCategoryOptionIndex({commit}, currentCategoryOptionIndex) {
        commit('setCurrentCategoryOptionIndex', currentCategoryOptionIndex);
    },

    reset({commit}) {
        commit('reset');
    },

    setOperationCategoriesIndex({commit}, operationCategoriesIndex) {
        commit('setOperationCategoriesIndex', operationCategoriesIndex)
    },

    setUser({commit}, user) {
        commit('setUser', user)
    },
}
