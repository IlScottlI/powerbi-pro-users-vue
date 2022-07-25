<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-stepper v-model="step" vertical>
        <v-stepper-step
          :complete="step > 1"
          step="1"
          @click="step = 1"
          style="cursor: pointer"
        >
          Create Microsoft Docs Account
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card class="">
            <v-row class="d-flex align-center justify-center">
              <v-col cols="12" sm="3">
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    class="d-flex align-center justify-center text-h5"
                  >
                    Create Microsoft Docs Account
                  </v-col>
                  <v-col class="d-flex align-center justify-center">
                    <v-btn
                      color="success"
                      href="https://docs.microsoft.com/en-us/"
                      target="_blank"
                    >
                      Microsoft Docs
                      <v-icon class="ma-3">mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="d-flex align-center justify-center"
                  >
                    Copy Username Microsoft Docs Profile
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <a href="https://tsp-appserverpe.na.pg.com/APIs/MicrosoftDocs/Microsoft_Docs_Create.gif" target="_blank"
                  ><v-img
                    :src="OPG"
                    alt="Microsoft-Docs-Create"
                    :style="'width: 40vw; background-image: url('+loadingGif+')no-repeat; background-size: fill;'"
                    border="0"
                  ></v-img
                ></a>
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" @click="step = 2"> Continue </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 2"
          step="2"
          @click="step = 2"
          style="cursor: pointer"
        >
          Paste Username from Microsoft Docs
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card class="mb-12 pa-4">
            <v-row class="d-flex align-center justify-center">
              <v-col cols="12" sm="3">
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    class="d-flex align-center justify-center text-h5"
                  >
                    Paste Username from Microsoft Docs
                  </v-col>
                  <v-col class="d-flex align-center justify-center ma-3">
                    <v-text-field
                      class="ma-3"
                      v-model="username"
                      label="USERNAME"
                      hint="Not Your P&G EMAIL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="d-flex align-center justify-center"
                  >
                    Verify Microsoft Docs Profile
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <view-profile v-if="displayName" />
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="step = 3" :disabled="!profileFound">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 3"
          step="3"
          @click="step = 3"
          style="cursor: pointer"
          v-if="profileFound"
        >
          Select Organization
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card class="mb-12">
            <v-card-title>
              <span class="text-h5">Select Location</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                <v-col cols="12" v-if="check(locations)">
                      <v-combobox
                        v-model="location"
                        :items="locations"
                        required
                        label="Loaction"
                        @change="handleLocationChange"
                      ></v-combobox>
                  </v-col>
                  <v-col cols="12">
                      <v-combobox
                        v-model="organization"
                        :items="organizations"
                        required
                        label="Organization"
                      ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-btn
            color="success"
            @click="handleSave"
            :disabled="saveBtnEnabled()"
            >Save</v-btn
          >
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </v-row>
</template>

<script>
import ViewProfile from "./ViewProfile.vue";
import OPG from '../assets/Microsoft_Docs_Create.gif';
import loadingGif from '../assets/loading.gif';
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  components: {
    ViewProfile,
  },
  data: () => ({
    OPG,
    loadingGif,
    displayName: "",
    step: 1,
    profileFound: false,
  }),
  computed: {
    ...mapState(["userProfileFound", "userProfile", "organizations", "locations","userorganization"]),
    ...mapGetters([
      "userRegistered",
      "userProfileFound",
      "userRegisteredProfile",
    ]),
    theme: function () {
      return this.$vuetify.theme;
    },
    organization: {
      get() {
        return this.$store.state.organization;
      },
      set(value) {
        this.setOrganization(value);
      },
    },
    userRegisteredProfileTemp: {
      get() {
        return this.$store.state.userRegisteredProfileTemp;
      },
      set(value) {
        this.setUserRegisteredProfileTemp(value);
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
    userlocation: {
      get() {
        return this.$store.state.userlocation;
      },
      set(value) {
        this.$store.commit('setuserlocation',value);
      },
    },
    showButton() {
      return this.organization;
    },
    dialog: {
      get() {
        return this.$store.state.dialog;
      },
      set(value) {
        this.setDialog(value);
      },
    },
    username: {
      get() {
        return this.$store.state.username == undefined | '' ? '' : this.$store.state.username;
      },
      set(value) {
        this.setUsername(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setDialog", "setUsername", "setOrganization", "setUserRegisteredProfileTemp","setLocation"]),
    ...mapActions(["postSharePointListItem", "patchSharePointListItem"]),
    handleSave() {
      if (this.userRegistered) {
        this.patchSharePointListItem();
      } else {
        this.postSharePointListItem();
      }
    },
    showLocation(userRegisteredProfile){
      if(userRegisteredProfile?.location){
        return true;
      } else {
        return false;
      }
    },
    check(arr){
      return Array.isArray(arr);
    },
    returnLocation(){
      let location =this.userRegisteredProfile?.location;
      if(location){
        return location;
      } else {
        return '';
      }
    },
    handleLocationChange(){
      this.userlocation = this.location;
      this.$store.dispatch('getSharePointListBUItems');
      this.organization = null;
    },
    saveBtnEnabled(){
      let res = true;
      if (this.location) {
        if (this.organization) {
        res = false;
      } else {
        res = true;
      }
      }
      return res;
    },
  },
  watch: {
    location(value){
      this.userlocation = value;
      document.title = value + " Power BI"; 
    },
    organization(value){
      this.userRegisteredProfileTemp.organization = value;
    },
    userRegisteredProfile(userRegisteredProfile) {
      this.setUserRegisteredProfileTemp(userRegisteredProfile);
      this.organization = userRegisteredProfile?.organization;
      this.userlocation = userRegisteredProfile?.location;
      this.location = userRegisteredProfile?.location;
      if (userRegisteredProfile.id) {
        this.setDialog(false);
      } 
    },
    userProfile(val) {
      if (val.displayName) {
        this.displayName = val.displayName;
        this.profileFound = true;
      } else {
        this.displayName = "";
        this.profileFound = false;
      }
    },
  },
};
</script>
