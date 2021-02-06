export const state = () => ({
  UserMarketplaces: [],
});

export const mutations = {
  SetMarketplaceState(state, data){
    Object.assign(state.MarketplaceState[data.name], data);
  },
  SetUserMarketplaces(state, data){
    state.UserMarketplaces = data;
  },
  SetUserMarketplaceApi(state, data){
    state.UserMarketplaces.filter(el => el.name === data.url)[0].api.options.filter(el => el.id === data.api.id)[0].value = data.api.value;
  },
  SetUserMarketplaceStatus(state, data){
    state.UserMarketplaces.filter(el => el.url === data.url)[0].status = data.status;
  },
  SetUserMarketplaceStorage(state, data){
    state.UserMarketplaces.filter(el => el.url === data.url)[0].info.store.options.filter(el => el.type === data.store.type)[0].status = data.store.status;
  },
};

export const actions = {
  async GetUserMarketplaces({ commit }){
    await this.$CreateRequest({
      path: 'user/marketplaces/list.php',
      ResponseCallback: response => {
        commit('SetUserMarketplaces', response.data.data);
      }
    });
  },
  async UpdateUserMarketplaceApi({ commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/marketplaces/update-info.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserMarketplaceApi', data);

        dispatch('HelperPopupState',{
          text: `Данные маркетплейса '${data.name}' изменены.    Поле '${data.api.name}' успешно измнено!`,
          classes: 'helper-popup--success',
          time: 5000
        }, {
          root: true
        });
      }
    });
  },
  async UpdateUserMarketplaceStatus({ commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/marketplaces/update-status.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserMarketplaceStatus', data);

        dispatch('HelperPopupState',{
          text: response.data.text,
          classes: 'helper-popup--success',
          time: 3500
        }, {
          root: true
        });
      }
    });
  },
  async UpdateUserMarketplaceStorage({ commit }, data){
    await this.$CreateRequest({
      path: 'user/marketplaces/update-storages.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserMarketplaceStorage', data);
      }
    });
  }
};

export const getters = {
  UserMarketplaces: state => state.UserMarketplaces,
};
