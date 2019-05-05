import IndexApi from "../../../api/IndexApi";

export const moduleId = 'index';

export const state = {
  user: '',
  pwd: '',
  loginFlag: '',
  loginType: '',
};

export const actions = {

  // onCreate({dispatch , commit},{to,from}){
  //   console.log('onCreate')
  // },
  // onResume({dispatch, state, commit , getters},{to,from}){
  //   console.log('onResume')
  // },

  initView({dispatch, commit, state}) {
    commit('initQuery', '111');
    dispatch('login');
  },
  async login({ commit, state, dispatch}) {
    let res = await IndexApi.login(state.user, state.pwd, state.loginFlag, state.loginType);
  },
};

export const mutations = {
  initQuery(state, value) {
    console.log(value)
    state.user = '123123';
    state.pwd = '123qweasd';
    state.loginFlag = '1';
    state.loginType = '2';

  },
};


export const getters = {
  dealData(state) {}
};
