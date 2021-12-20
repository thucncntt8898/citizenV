import axios from "./axiosConfig";
import moment from "moment";

export const state = () => ({
    isOpenMainContent: 1,
    districts: [],
    sessions: [],
    isDataFilterLoading: false,
    isDataFilterCompletedLoading: false,
    needHandlingData: {},
    districtsAreSelected: [],
    dateIsSelected: moment(),
    sessionIsSelected: {},
    firstOpenMainContent: 0,
    stationsAreSelected: [],
    stations: [],
    isActiveRouteCod: true
})

export const mutations = {
    setIsOpenMainContent(state, isOpenMainContent) {
        state.isOpenMainContent = isOpenMainContent
    },

    setDistricts(state, districts) {
        state.districts = districts
    },

    setSessions(state, sessions) {
        state.sessions = sessions
    },

    setDataFilterLoading(state, isDataFilterLoading) {
        state.isDataFilterLoading = isDataFilterLoading
    },

    setDataFilterCompletedLoading(state, isDataFilterCompletedLoading) {
        state.isDataFilterCompletedLoading = isDataFilterCompletedLoading
    },

    setNeedHandlingData(state, needHandlingData) {
        state.needHandlingData = needHandlingData
    },

    setDistrictsAreSelected(state, districtsAreSelected) {
        state.districtsAreSelected = districtsAreSelected
    },

    setDateIsSelected(state, dateIsSelected) {
        state.dateIsSelected = dateIsSelected
    },

    setSessionIsSelected(state, sessionIsSelected) {
        state.sessionIsSelected = sessionIsSelected
    },

    setStationsAreSelected(state, stationsAreSelected) {
        state.stationsAreSelected = stationsAreSelected
    },

    setStations(state, stations) {
        state.stations = stations
    },

    setIsActiveRouteCod(state, isActiveRouteCod) {
        state.isActiveRouteCod = isActiveRouteCod
    },

    reset(state) {
        state.isOpenMainContent = 1
        state.districts = []
        state.sessions = []
        state.isDataFilterLoading = false
        state.isDataFilterCompletedLoading = false
        state.needHandlingData = {}
        state.districtsAreSelected = []
        state.dateIsSelected = null
        state.sessionIsSelected = {}
        state.stationsAreSelected = []
        state.stations = []
        state.isActiveRouteCod = true
    }
}

export const actions = {
    openMainContent({commit}, isOpenMainContent) {
        commit('setIsOpenMainContent', isOpenMainContent)
    },

    setDistricts({commit}, districts) {
        commit('setDistricts', districts)
    },

    setSessions({commit}, sessions) {
        commit('setSessions', sessions)
    },

    setDataFilterLoading({commit}, isDataFilterLoading) {
        commit('setDataFilterLoading', isDataFilterLoading)
    },

    setDataFilterCompletedLoading({commit}, isDataFilterCompletedLoading) {
        commit('setDataFilterCompletedLoading', isDataFilterCompletedLoading)
    },

    setNeedHandlingData({commit}, needHandlingData) {
        commit('setNeedHandlingData', needHandlingData)
    },

    setDistrictsAreSelected({commit}, districtsAreSelected) {
        commit('setDistrictsAreSelected', districtsAreSelected)
    },

    setDateIsSelected({commit}, dateIsSelected) {
        commit('setDateIsSelected', dateIsSelected)
    },

    setSessionIsSelected({commit}, sessionIsSelected) {
        commit('setSessionIsSelected', sessionIsSelected)
    },

    setStations({commit}, stations) {
        commit('setStations', stations)
    },

    setIsActiveRouteCod({commit}, isActiveRouteCod) {
        commit('setIsActiveRouteCod', isActiveRouteCod)
    },

    reset({commit}) {
        commit('reset');
    },
}
