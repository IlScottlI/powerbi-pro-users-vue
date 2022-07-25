<template>
  <v-app style="background-color: black" class="pa-0 ma-0">
    <v-card class="pa-0 ma-0 overflow-hidden">
      <v-app-bar
        ref="appbar"
        absolute
        dark
        shrink-on-scroll
        prominent
        fade-img-on-scroll
        scroll-target="#scrolling-techniques"
        scroll-threshold="500"
      >
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="logo"
            transition="scale-transition"
            width="200"
          />
        </div>
        <v-row>
          <v-btn
            dark
            color="dark"
            bottom
            right
            absolute
            class="ms-10"
            @click="toggleReload()"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            dark
            color="dark"
            bottom
            right
            absolute
            class="me-15"
            @click="toggleDialog()"
          >
            Profile
          </v-btn>
        </v-row>
        <v-spacer></v-spacer>
        <h5>{{userlocation}}</h5>
        <h1
          style="color: #ffd31d; margin-top: 1.5rem; cursor: pointer"
          @click="router.push({ name: 'Home' })"
          v-if="show"
          class="pe-10"
        >
          POWER BI
        </h1>
        <div style="width: auto">
          <mgt-login id="login" class="mgt-dark"></mgt-login>
        </div>
      </v-app-bar>
      <registration class="pa-0 ma-0" />
      <v-sheet id="scrolling-techniques" class="overflow-y-auto">
        <v-main class="pa-0 ma-0 pt-16 mt-16">
          <v-theme-provider></v-theme-provider>
          <v-tabs align-with-title>
            <v-tab v-for="item in routes" :key="item.name" :to="item.path">{{
              item.name
            }}</v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
          <router-view />
        </v-main>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import Registration from "./components/Registration.vue";
import logo from "./assets/getsitelogo.png";
import router from "./router";
import functions from "./utils/functions";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "App",
  components: {
    Registration,
  },
  data() {
    return {
      logo,
      router,
      hidden: false,
      tabs: "",
      path:this.$route.path
    };
  },
  computed: {
    ...mapState([
      "accessToken",
      "userProfile",
      "userDetails",
      "username",
      "reload",
      "organizations",
      "userBIProfile",
    ]),
    ...mapGetters([
      "userRegisteredProfile",
      "userRegistered",
      "userId",
      "uids",
    ]),
    selectedOrganizations: {
      get() {
        return this.$store.state.selectedOrganizations;
      },
      set(value) {
        this.setSelectedOrganizations(value);
      },
    },
    location: {
      get() {
        return this.$store.state.location;
      },
      set(value) {
        this.setLocation(value);
      },
    },
    userorganization: {
      get() {
        return this.$store.state.userorganization;
      },
      set(value) {
        this.setuserorganization(value);
      },
    },
    userlocation: {
      get() {
        return this.$store.state.userlocation;
      },
      set(value) {
        this.setuserlocation(value);
      },
    },
    show() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    height() {
      return this.$vuetify.breakpoint.height;
    },
    appBarHeight() {
      return this?.$refs.appbar.$vnode.elm.style.height;
    },
    routes() {
      return this.router?.options.routes;
    },
    currentRoute() {
      return this.router.currentRoute.name;
    },
  },
  methods: {
    ...mapMutations([
      "setAccessToken",
      "setUserProfile",
      "setUsername",
      "setDialog",
      "setIsLoading",
      "toggleReload",
      "toggleDialog",
      "setSelectedOrganizations",
      "setLocation",
      "setuserlocation",
      "setuserorganization",
    ]),
    ...mapActions([
      "getSharePointListItems",
      "getGraphUserProfile",
      "getUserDocsProfile",
      "getUserDocsGameStatus",
      "getAchievementLookup",
      "getSharePointListConfigurationItems",
      "getSharePointListBUItems",
      "getSharePointListChampionItems",
      "getBIUserProfile",
    ]),
    submit() {
      console.log(this.$refs.appbar.$vnode.elm.style.height);
    },
    pageChange() {
      this.setIsLoading(true);
      this.getUserDocsGameStatus();
    },
    visibilityChange() {
      if (!document.hidden) {
        this.toggleReload();
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.setAccessToken(functions.getAccessToken());
  },
  mounted() {
    this.getSharePointListConfigurationItems();
    this.getSharePointListBUItems();
    this.getSharePointListChampionItems();
    this.getGraphUserProfile();

  },
  watch: {
    userDetails(e) {
      this.getSharePointListItems();
      this.getBIUserProfile(e.mail);
    },
    userlocation(){
      this.getSharePointListItems();
      document.title = this.userlocation + " Power BI";
    },
    userBIProfile(userBIProfile){
      this.userlocation = userBIProfile.location;
      this.userorganization = userBIProfile.organization;
    },
    userRegisteredProfile(val) {
      if(!val) return;
    },
    userRegistered(val) {
      this.setDialog(!val);
    },
    username() {
      this.getUserDocsProfile();
    },
    userId() {
      this.getUserDocsGameStatus();
    },
    uids() {
      this.getAchievementLookup();
    },
    $route(){
      this.toggleReload();
    },
    reload() {
      this.setIsLoading(true);
      this.getAchievementLookup();
      this.getSharePointListConfigurationItems();
      this.getSharePointListItems();
      this.getUserDocsGameStatus();
      this.getSharePointListChampionItems();
      this.getSharePointListItems();
    },
  },
};
</script>

<style >
html {
  overflow: auto;
  background-color: black;
}
</style>