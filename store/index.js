import Vue from 'vue'
import Vuex from 'vuex'
import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants"
import { loginRequest } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userid:'',
    name: '',
    realname: '',
    welcome: '',
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, realname, welcome }) => {
      state.name = name
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginRequest(userInfo).then(response => {
          if(response.code ==200){
            const userInfo = response.data
            // uni.setStorageSync(ACCESS_TOKEN,response.token);
            // uni.setStorageSync(USER_INFO,userInfo);
            commit('SET_TOKEN', response.token)
            commit('SET_NAME', { name: userInfo.name,realname: userInfo.realname})
            commit('SET_AVATAR', userInfo.avatar)
          }
          resolve(response)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        uni.removeStorageSync(ACCESS_TOKEN)
        api.logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  },
  getters:{
    token: state => state.token,
	name: state => {state.userid=uni.getStorageSync(USER_INFO).name; return state.name},
	nickname: state => {state.userid=uni.getStorageSync(USER_INFO).realname; return state.user.realname},
	avatar: state => {state.userid=uni.getStorageSync(USER_INFO).avatar; return state.user.avatar},
	userid:state => {state.userid=uni.getStorageSync(USER_INFO).id; return state.userid},
  }
})
