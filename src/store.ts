import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // GraphQL has been throwing errors since 7/12. This is a workaround
  // So development can proceed till the issue is fixed
  state: {
    event: {},
    eventPage: 0,
    organizationId: '',
    baseUrl: '',
    sessionKey: '',
  },
  mutations: {
    event(state, evt) {
      state.event = evt;
    },
    eventPage(state, page) {
      state.eventPage = page;
    },
    organizationId(state, obj) {
      state.organizationId = obj;
    },
    baseUrl(state, obj) {
      state.baseUrl = obj;
    },
    sessionKey(state, obj) {
      state.sessionKey = obj;
    },
  },
  getters: {
    event: (state) => {
      return state.event;
    },
    eventPage: (state) => {
      return state.eventPage;
    },
    organizationId: (state) => {
      return state.organizationId;
    },
    baseUrl: (state) => {
      return state.baseUrl;
    },
    sessionKey: (state) => {
      return state.sessionKey;
    },
  },
  actions: {

  },
});
