import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    cachedViews: [],
    showTab: false,
    likeStatus: null, // 点赞画作状态
    followStatus: null, // 画师关注状态
    detail: null, // 详情信息
    loginBoolean: false,
    loginOrSign: true,
    collectBoolean: false,
    readyCollectItem: {},
    collectInfo: {},
    serverAddress: localStorage.getItem('serverAddress') || null,
    phoneBoolean: false,
    imgClick:false,
    imgClickUrl:{},
  },
  mutations: {
    LoginBoolean(state,Boolean){
      state.loginBoolean = Boolean;
    },
    loginOrSign(state,Boolean){
      state.loginOrSign = Boolean;
    },
    imgClickUrl(state,url){
      state.imgClickUrl = url;
    },
    setUser(state,user){
      state.user = user;
    },
    setHead(state,url){
      state.user.headUrl = url

    },
  },
  actions: {
    LoginBoolean(state,Boolean) {
    this.state.loginBoolean = Boolean
    },
    LoginOrSign(state,Boolean) {
    this.state.loginOrSign = Boolean
    },
    imgClick(state,Boolean){
      this.state.imgClick = Boolean
    },
    setUser({commit,state},user){
      //console.log(state,user);
      commit(setUser, user);
    },
    setHead({commit,state},url){
      commit(setHead, url);
    },
  },
  getters:{
     loginBoolean: state => {return state.loginBoolean},
     loginOrSign: state => {return state.loginOrSign},
     imgClick: state => {return state.imgClick},
     imgClickUrl: state => {return state.imgClickUrl},
     user: state => {return state.user},
  },
  modules: {
  }
})
