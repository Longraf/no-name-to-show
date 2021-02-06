export const state = () => ({
  UserStorageInfo: {},
  MarketplacesStorages: [],
});

// export const mutations = {
//   SetUserStorageInfo(state, data){
//     state.UserStorageInfo = data;
//   },
//   UpdateStorageInfo(state, data){
//     Object.keys(data).forEach(el => {
//       state.UserStorageInfo[el] = data[el];
//     })
//   },
//   SetMarketplacesStorages(state, data){
//     state.MarketplacesStorages = data;
//   },
// };
//
// export const actions = {
//   async GetUserStorageInfo({ commit }){
//     await this.$CreateRequest({
//       path: 'user/storages/list.php',
//       ResponseCallback: response => {
//         commit('SetUserStorageInfo', response.data.data.UserStorage);
//         commit('SetMarketplacesStorages', response.data.data.MarketplacesStorages);
//       }
//     });
//   },
//   async UpdateUserStorageInfo({commit, dispatch }, data){
//     await this.$CreateRequest({
//       path: 'user/storages/update.php',
//       RequestBody: {
//         data: {
//           UserStorage: data
//         }
//       },
//       ResponseCallback: response => {
//         commit('SetUserStorageInfo', response.data.data.UserStorage);
//         commit('SetMarketplacesStorages', response.data.data.MarketplacesStorages);
//
//         dispatch('HelperPopupState', {
//           text: 'Сохранено',
//           classes: 'helper-popup--success',
//         }, {
//           root: true
//         });
//       }
//     });
//   },
// };
//
// export const getters = {
//   MarketplacesStorages: state => state.MarketplacesStorages,
//   UserStorageInfo: state => state.UserStorageInfo,
// };
