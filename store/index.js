import { getCookie } from "../scripts/helpers/cookies";

export const state = () => ({
  HelperPopup: {
    AnimationState: true,
    state: false,
    text: '',
    classes: 'helper-popup--success',
  },
  SidebarState: true,
  MobileMenuState: false
});

export const mutations = {
  HelperPopupState(state, data){
    state.HelperPopup['AnimationState'] = data.AnimationState;
    state.HelperPopup['state'] = data.state;
    state.HelperPopup['text'] = data.text;
    state.HelperPopup['classes'] = data.classes;
  },
  ToggleSidebar(state, value){
    state.SidebarState = value;
  },
  ToggleMobileMenu(state, value){
    state.MobileMenuState = value;
  }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, context){
    if (true){
      commit('user/SetUserToken', 'b66e2bbfab198022e41da386c05a7044');

      await dispatch('user/GetUserData');
      await dispatch('user/road-map/GetRoadMap');

      //TODO Включить загрузку оповещений, после настройки фукнционала оповещений.
      //await dispatch('notifications/GetNotificationsList');
    }
  },
  async HelperPopupState({commit, state}, data){
    if (state.HelperPopup.AnimationState && typeof window !== "undefined"){
      await commit('HelperPopupState',{
        AnimationState: false,
        state: true,
        text: data.text,
        classes: data.classes
      });

      await setTimeout(() => {
        commit('HelperPopupState',{
          AnimationState: false,
          state: false,
          text: '',
          classes: '',
        });
      },((data.time !== null) && data.time !== undefined) ? data.time : 2150);

      await setTimeout(() => {
        commit('HelperPopupState',{
          AnimationState: true,
        });
      },((data.time !== null) && data.time !== undefined) ? data.time + 3750 : 3750);
    }
  }
};

export const getters = {
  HelperPopup: state => state.HelperPopup,
  SidebarState: state => state.SidebarState,
  MobileMenuState: state => state.MobileMenuState
};
