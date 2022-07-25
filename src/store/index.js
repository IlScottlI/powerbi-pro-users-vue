import Vue from 'vue';
import Vuex from 'vuex';
import functions from '../utils/functions';
import { set, toggle } from '../utils/vuex';
import gold from '../assets/gold.svg';
import silver from '../assets/Silver.svg';
import bronze from '../assets/Bronze.svg';
import Swal from 'sweetalert2';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    site: '58909e7e-80d5-4fe6-bdd2-e6a5eba8f9c7,7ebc1f4d-6c2a-4ced-92fb-6ab9f643d34f',
    friendsOfBiSite: 'c4239b3e-5a81-4d0a-870e-d6d4af55ee43,f76ce23e-ae30-4d58-acff-282a86cea21c',
    list: 'a48f1d65-4147-4f05-afd8-b221d3047bc5',
    configList: '7F97662A-0BFF-43ED-B6C0-5517E2796E99',
    buList: 'f081f6e9-1c8e-4120-b100-48071a96c513',
    champList: 'd1c60f05-2354-4b23-a1ab-22aeb78f4c91',
    accessToken: '',
    isLoading: true,
    listItems: [],
    dialog: false,
    userProfile: null,
    userBIProfile: null,
    userDetails: null,
    username: '',
    gamestatus: null,
    achievementsList: [],
    championsList: [],
    stepupCards: [],
    organization: null,
    location: '',
    userlocation: null,
    userorganization: '',
    organizations: [],
    locations: [],
    selectedOrganizations: null,
    reload: false,
    actionUpdate: null,
    achievementListCombined:null,
    userRegisteredProfileTemp:{location:''},
  },
  getters: {
    leaderboardItems: (state) => {
      function compare(a, b) {
        if (a.totalPoints > b.totalPoints)
          return -1;
        if (a.totalPoints < b.totalPoints)
          return 1;
        return 0;
      }
      let items = state.listItems.sort(compare);
      for (let i = 0; i < items.length; i++) {
        switch (i) {
          case 0:
            items[i].icon = gold;
            break;
          case 1:
            items[i].icon = silver;
            break;
          case 2:
            items[i].icon = bronze;
            break;
          default:
            items[i].icon = '';
            break;
        }
      }
      return items;
    },
    achievementsItems: (state) => {
      let items = [];     
      if(Array.isArray(state.stepupCards)){
        state.stepupCards.forEach(item => {
          item.cardItems.forEach((e) => {
            items.push(e.uid);
          });
        });
      }      
      return items;
    },
    userRegistered: (state) => {
      let res = false;
      try {
        if (state.userBIProfile.email === state.userDetails?.userPrincipalName) {
          res = true;
        }
      } catch {
        //
      }
      return res;
    },
    userProfileFound: (state) => {
      let res = false;
      state.listItems.forEach((item) => {
        try {
          if (item.fields.Title.toLocaleLowerCase() === state.userProfile?.userName.toLocaleLowerCase()) {
            res = true;
          }
        } catch {
          res = false;
        }
      });
      return res;
    },
    userRegisteredProfile: (state) => {
      return state.userBIProfile;
    },
    builderEmailList: (state) => {
      let res = [];
      state.championsList.map(e => {
        if (e.FOBI_x0020_Champion_x0020_Level === "PBI Builder") {
          res.push(e.Champion_x0020_Email);
        }
      });
      return res;
    },
    wizardEmailList: (state) => {
      let res = [];
      state.championsList.map(e => {
        if (e.FOBI_x0020_Champion_x0020_Level === "PBI Wizard") {
          res.push(e.Champion_x0020_Email);
        }
      });
      return res;
    },
    masterEmailList: (state) => {
      let res = [];
      state.championsList.map(e => {
        if (e.FOBI_x0020_Champion_x0020_Level === "PBI Master") {
          res.push(e.Champion_x0020_Email);
        }
      });
      return res;
    },
    userId: (state) => {
      return state.userProfile?.userId;
    },
    userProfileImage: (state) => {
      return state.userProfile?.avatarUrl;
    },
    userProfileDisplayName: (state) => {
      return state.userProfile?.displayName;
    },
    userEmail: (state) => {
      return state.userDetails?.userPrincipalName;
    },
    userLevel: (state) => {
      return state.gamestatus?.level.levelNumber ? state.gamestatus?.level.levelNumber : 0;
    },
    userTotalPoints: (state) => {
      return state.gamestatus?.totalPoints ? state.gamestatus?.totalPoints : 0;
    },
    userPointsHigh: (state) => {
      return state.gamestatus?.level.pointsHigh;
    },
    userPointsLow: (state) => {
      return state.gamestatus?.level.pointsLow;
    },
    userBadges: (state) => {
      let arr = [];
      state.gamestatus?.achievements.map(e => {
        if (e.awardType === 'Badge') { arr.push(e); }
      });
      return arr;
    },
    uids: (state) => {
      return state.gamestatus?.achievements.map((e) => { return e.awardUid; }).join(',');
    },
  },
  mutations: {
    toggleReload: toggle('reload'),
    toggleIsLoading: toggle('isLoading'),
    toggleDialog: toggle('dialog'),
    setAccessToken: set('accessToken'),
    setIsLoading: set('isLoading'),
    setListItems: set('listItems'),
    setStepupCards: set('stepupCards'),
    setDialog: set('dialog'),
    setUserProfile: set('userProfile'),
    setuserBIProfile: set('userBIProfile'),
    setUserDetails: set('userDetails'),
    setUsername: set('username'),
    setGamestatus: set('gamestatus'),
    setOrganization: set('organization'),
    setLocation: set('location'),
    setuserlocation: set('userlocation'),
    setuserorganization: set('userorganization'),
    setLocations: set('locations'),
    setOrganizations: set('organizations'),
    setAchievementsList: set('achievementsList'),
    setChampionsList: set('championsList'),
    setSelectedOrganizations: set('selectedOrganizations'),
    setActionUpdate: set('actionUpdate'),
    setAchievementListCombined: set('achievementListCombined'),
    setUserRegisteredProfileTemp: set('userRegisteredProfileTemp'),
  },
  actions: {
    getSharePointListConfigurationItems: function ({ commit, state }) {
      let res = functions.getSharePointListItems(state.site, state.accessToken, state.configList);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setStepupCards', res.value.map((e) => {
            let data = JSON.parse(e.fields.JSON_Data);
            if (e.fields?.Badge) {
              data.Badge = JSON.parse(e.fields.Badge).serverUrl + JSON.parse(e.fields.Badge).serverRelativeUrl;
            }
            return data;
          }));
        }
      });
    },
    getSharePointListItems: function ({ commit, state }) {
      if(!state.userBIProfile) return;
      let string = '&$orderBy=lastModifiedDateTime desc&$filter=';
      let res;
      let filterCount = 0;
      if(state.userorganization){
        filterCount = filterCount + 1;
        if (filterCount > 1) {
          string += ' and ';
        }
        string += `fields/organization eq '${state.userorganization}'`;
      }
      if(state.userlocation){
        filterCount = filterCount + 1;
        if (filterCount > 1) {
          string += ' and ';
        }
        string += `fields/location eq '${state.userlocation}'`;
      }
      res = functions.getSharePointListItems(state.site, state.accessToken, state.list, 4999, string);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setListItems', res.value);
        }
      });
    },
    getSharePointListBUItems: function ({ commit, state }) {
      let res = functions.getSharePointListItems(state.site, state.accessToken, state.buList, 4999, '&$orderBy=fields/Title');
      res.then((res) => {
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        if (Array.isArray(res.value)) {
          if(!state.dialog){
            if (!res.value.map(e => { return e.fields.email; }).includes(res.value.userPrincipalName)) {
              commit('setDialog', true);
            } else {
              commit('setDialog', false);
            }
          }
          let locations;
          try {
            locations = res.value.map(e=>e.fields.Location).filter(e=>e!= undefined).filter(onlyUnique);
          } catch (error) {
            locations = [];
          }
          commit('setLocations', locations);
          if(state.userlocation){
            let organizations = res.value.filter(e=>e.fields.Location == state.userlocation).map(e => { return e.fields.Title; });
            commit('setOrganizations', organizations);
          }
        }
      });
    },
    getSharePointListChampionItems: function ({ commit, state }) {
      let res = functions.getSharePointListItems(state.friendsOfBiSite, state.accessToken, state.champList);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setChampionsList', res.value.map(e => { return e.fields; }));
        }
      });
    },
    getGraphUserProfile: function ({ commit, state }) {
      let res = functions.getGraphUserProfile(state.accessToken);
      res.then((res) => {
        commit('setUserDetails', res);
      });
    },
    getBIUserProfile: function ({ commit, state }, email) {
      let res = functions.getSharePointListItems(state.site, state.accessToken, state.list, 10, `&$filter=fields/email eq '${email}'`);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          if(res.value.length){
            commit('setuserBIProfile', res.value[0].fields);
            commit('setUserProfile', res.value[0].fields);
            commit('setUsername', res.value[0].fields.Title);
            commit('setDialog', false);
          } else {
            commit('setuserBIProfile', res.value);
            commit('setDialog', true);
          }
        }
      });
    },
    getUserDocsProfile: function ({ commit, state }) {
      if(state.username == 'undefined') return;
      let res = functions.getUserDocsProfile(state.username);
      res.then((res) => {
        commit('setUserProfile', res);
      });
    },
    getUserDocsGameStatus: function ({ commit, getters }) {
      let res = functions.getUserDocsGameStatus(getters.userId);
      res.then((res) => {
        commit('setGamestatus', res);
      });
    },
    getAchievementLookup: function ({ commit, getters }) {
      let res = functions.getAchievementLookup(getters.uids);
      res.then((res) => {
        let arr = [];
        if(getters.userRegisteredProfile?.JSON_Data){
          try {
            arr = JSON.parse(getters.userRegisteredProfile.JSON_Data).map(e=>{return {uid:e};});
          } catch {
            arr = [];
          }
        } 
        if(Array.isArray(res)){
          res.forEach(e => {
            arr.push(e);
          });
        }
        commit('setAchievementsList', arr);
        commit('setIsLoading', false);
      });
    },
    fetchUserProfile: function ({ commit, getters }) {
      let res = functions.getUserProfile(getters.userRegisteredProfile.email);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setUserProfile', res.value);
          commit('setUserDetails', document.querySelector("#login").userDetails);
        }
      });
    },
    postSharePointListItem: function ({ commit, getters, state }) {
      let res = functions.postSharePointListItem(state.site, state.accessToken, state.list, {
        "fields":
          { "Title": state.userProfile.userName, "email": getters.userEmail, "displayOn": "true", "organization": state.organization }
      });
      res.then(() => {
        Swal.fire({
          title: 'Profile Created',
          text: '',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        commit('setDialog', false);
        commit('toggleReload');
      });
    },
    patchSharePointListItem: function ({ commit, getters, state }) {
      let res = functions.patchSharePointListItem(state.site, state.accessToken, state.list, getters.userRegisteredProfile.id, {
        fields:
        {
          Title: state.userProfile.userName,
          email: getters.userEmail,
          organization: state.userRegisteredProfileTemp?.organization,
          location: state.userRegisteredProfileTemp?.location,
          JSON_Data: state.userRegisteredProfileTemp?.JSON_Data,
        }
      });
      res.then(() => {
        Swal.fire({
          title: 'Profile Updated',
          text: '',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        commit('setActionUpdate', null);
        commit('setDialog', false);
        commit('toggleReload');
      });
    },
  },
  modules: {
  }
});
