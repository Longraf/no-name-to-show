import { setCookie } from "../../scripts/helpers/cookies";

export const state = () => ({
  User: {},
  Company: {},
  UserToken: null,
});

export const mutations = {
  SetUserToken(state, token){
    state.UserToken = token;

    setCookie('UserToken', token, {'max-age': 2592000});
  },

  ClearUserToken(state){
    state.UserToken = null;

    setCookie('UserToken', null);
  },

  SetUserData(state, user){
    state.User = user;
  },

  SetCompanyData(state, company){
    state.Company = company;
  },
};

export const actions = {
  async GetUserData({ commit }){
    await this.$CreateRequest({
      path: 'user/info.php',
      ResponseCallback: response => {
        commit('SetUserData', response.data.data.userInfo);
        commit('SetCompanyData', response.data.data.companyInfo);
      }
    });
  },
  async UpdateUserData({commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/update.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserData', response.data.data.userInfo);

        dispatch('HelperPopupState', {
          text: 'Сохранено',
          classes: 'helper-popup--success',
        }, {
          root: true
        });
      }
    });
  },
  async UpdateCompanyData({commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/update.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetCompanyData', response.data.data.companyInfo);

        dispatch('HelperPopupState', {
          text: 'Сохранено',
          classes: 'helper-popup--success',
        }, {
          root: true
        });
      }
    });
  },

  async LoginUser({commit, dispatch, state}, data){
    await this.$CreateRequest({
      path: 'user/login.php',
      RequestBody: {
        data: {
          phone: `7${data.phone}`,
          code: data.code,
        }
      },
      ResponseCallback: response => {
        commit('SetUserToken', response.data.data.authToken);

        this.$router.push('/');
      },
      ErrorCallback: error => {
        dispatch('HelperPopupState', {
          text: error,
          classes: 'helper-popup--error',
        }, {
          root: true
        });
      }
    });
  },
  async LogoutUser({ commit }){
    await this.$CreateRequest({
      path: 'user/logout.php',
      FinallyCallback: () => {
        commit('ClearUserToken');
        commit('SetUserData', {});
        commit('SetCompanyData', {});

        this.$router.push('/login');
      }
    });
  },
};

export const getters = {
  User: state => state.User,
  Company: state => state.Company,
  UserToken: state => state.UserToken,
  LoadingState: state => state.LoadingState,
};
