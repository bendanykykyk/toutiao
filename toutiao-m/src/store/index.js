import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "utils/storage";
Vue.use(Vuex);

const USER_KEY = "toutiao-user";

export default new Vuex.Store({
  state: {
    // user: window.localStorage.getItem("user")
    // 从本地存储的地方拿user信息
    user: getItem(USER_KEY) || "",
    cachedPages: ["TabBar"]
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      // 为了数据持久化（刷新后，vuex中的信息会清空），所以需要使用localStorage存储
      if (state.user) {
        setItem(USER_KEY, state.user);
      }
    },

    removeCachePage(state, pageName) {
      const index = state.cachedPages.indexOf(pageName);
      if (index !== -1) {
        state.cachedPages.splice(index, 1);
      }
    },

    addCachePage(state, pageName) {
      state.cachedPages.push(pageName);
    }
  },
  actions: {},
  modules: {}
});
