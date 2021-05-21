import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('user')), //存储用户信息
    user: getItem(USER_KEY),
  },
  mutations: {
    setUser(state, user) {
      state.user = user;

      // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }

  },
  actions: {
  },
  modules: {
  }
})
