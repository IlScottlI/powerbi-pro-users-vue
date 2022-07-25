<template>
  <v-card color="#39465b" class="align-start px-3" dark>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12">
        <div class="text-h5 font-weight-bold text-center">
          {{ card.heading }}
        </div>
        <v-row no-gutters v-if="isLoading">
          <v-col cols="12">
            <v-skeleton-loader type="article"></v-skeleton-loader>
          </v-col>
          <v-col cols="12">
            <v-skeleton-loader type="article, actions"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row no-gutters v-else>
          <v-col cols="12">
            <v-card
              class="pt-1 text-center text-p"
              outlined
              style="color: #ffc845"
              color="transparent"
              v-for="item in card.subtitles"
              :key="item.id"
            >
              {{ item }}
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center text-p">{{
            card.subExample
          }}</v-col>
          <v-col cols="12">
            <v-card color="#16161c" class="ma-4 pt-2 pa-4">
              <v-progress-linear
                :value="knowledge"
                height="25"
                :color="knowledge > 99 ? 'success' : 'primary'"
                v-if="!isLoading"
              >
                <strong>{{ Math.ceil(knowledge) }}%</strong>
              </v-progress-linear>
              <div
                class="text-center text-h6 font-weight-bold"
                style="color: #29b9ec"
              >
                PROGRESS
              </div>
              <v-chip-group
                column
                :value="card.cardItems | returnSelected({ achievementsList })"
              >
                <div v-for="item in card.cardItems" :key="item.id">
                  <v-chip
                    v-if="isProfileAction(item)"
                    small
                    :color="item | isCompleteColor({ achievementsList })"
                    @click="handleDialog(item)"
                  >
                    <v-icon
                      dark
                      class="me-2"
                      v-if="item | isComplete({ item, achievementsList })"
                    >
                      mdi-check-circle-outline
                    </v-icon>
                    {{ item.title }}
                  </v-chip>
                  <v-chip
                    v-else
                    small
                    :color="item | isCompleteColor({ achievementsList })"
                    :href="item.link"
                    target="_blank"
                    v-show="isLinkAction(item)"
                  >
                    <v-icon
                      dark
                      class="me-2"
                      v-if="item | isComplete({ item, achievementsList })"
                    >
                      mdi-check-circle-outline
                    </v-icon>
                    {{ item.title }}
                    <v-icon right dark> {{ item.icon }} </v-icon>
                  </v-chip>
                </div>
              </v-chip-group>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card color="#16161c" class="ms-4 me-4">
              <v-card-subtitle class="text-center text-p"
                >Format:</v-card-subtitle
              >
              <div
                class="text-center text-h6"
                style="color: #ffc845"
                color="transparent"
              >
                {{ card.format }}
              </div>
              <v-card-subtitle class="text-center text-p"
                >Badge Qualification:</v-card-subtitle
              >
              <div
                class="text-center text-h6"
                style="color: #ffc845"
                color="transparent"
              >
                {{ card.badgeQualification }}
              </div>
              <v-card
                class="text-center d-flex align-center"
                style="justify-content: center"
              >
                <div class="justify-center text-p">Time Investment:</div>
                <v-card-subtitle class="text-h6" style="color: #ffc845">{{
                  card.timeInvestment
                }}</v-card-subtitle>
              </v-card>
              <v-col cols="12" v-if="card.achievements.length > 0">
                <v-card-subtitle class="text-center text-p"
                  >Achievements:</v-card-subtitle
                >
                <div
                  class="text-center ma-0 pa-0"
                  style="color: #ffc845"
                  color="transparent"
                  v-for="item in card.achievements"
                  :key="item.id"
                >
                  <p :style="'color:' + item.color">{{ item.title }}</p>
                </div>
                <v-img
                  :src="
                    card.heading
                      | returnBool(
                        builderEmailList,
                        wizardEmailList,
                        masterEmailList,
                        userEmail
                      )
                  "
                >
                </v-img>
              </v-col>
              <v-col>
                <v-btn
                  class="ma-1"
                  :color="item.color"
                  light
                  target="_blank"
                  :href="item.link"
                  v-for="item in card.footerBtn"
                  :key="item.id"
                  small
                >
                  {{ item.title }}
                </v-btn>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title> {{ dialogStep.title }} </v-card-title>
        <v-btn
          link
          text
          color="primary"
          :href="dialogStep.link"
          target="_blank"
        >
          {{ dialogStep.title }}
          <v-icon right dark v-if="dialogStep.icon">
            {{ dialogStep.icon }}
          </v-icon>
        </v-btn>

        <v-card-text class="text-center">
          <v-select
            v-model="dialogStep.step"
            :items="['Yes']"
            :label="dialogStep.subtitle"
            @change="updateJSON_Data"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-btn
            :color="dialogStep.color"
            :disabled="stepDisabled"
            block
            @click="updateProfile(dialogStep)"
          >
            Update Profile
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import functions from "../../utils/functions.js";
import Swal from "sweetalert2";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "StepupCard",
  components: {
    //
  },
  data() {
    return {
      knowledge: 0,
      actions: 0,
      dialog2: false,
      dialogStep: {},
      JSON_Data: [],
      stepDisabled: true,
    };
  },
  computed: {
    ...mapState([
      "userProfile",
      "userDetails",
      "username",
      "stepupCards",
      "actionUpdate",
      "achievementsList",
      "userRegisteredProfileTemp",
      "site",
      "accessToken",
      "list",
      "organization",
    ]),
    ...mapGetters([
      "userRegisteredProfile",
      "userRegistered",
      "userId",
      "uids",
      "builderEmailList",
      "wizardEmailList",
      "masterEmailList",
      "userEmail",
    ]),
    achievementsItems() {
      return this.card.cardItems;
    },
    card: {
      get() {
        let index = this.stepupCards
          .map((e) => {
            return e.id;
          })
          .indexOf(this.$attrs.cardId);
        return this.stepupCards[index];
      },
      set(value) {
        this.stepupCards(value);
      }
    },
    isLoading: {
      get() {
        return this.$store.state.isLoading;
      },
      set(value) {
        this.setIsLoading(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setAccessToken",
      "setUserProfile",
      "setUsername",
      "setIsLoading",
      "setActionUpdate",
      "setAchievementsList",
      "setUserRegisteredProfileTemp",
      "toggleReload",
      "setDialog",
    ]),
    ...mapActions([
      "getSharePointListItems",
      "getGraphUserProfile",
      "getUserDocsProfile",
      "getUserDocsGameStatus",
      "getAchievementLookup",
    ]),
    updateJSON_Data() {
      this.stepDisabled = this.dialogStep?.step !== "Yes";
      let item = this.dialogStep;
      let JSON_Data = [];
      let profile = this.userRegisteredProfile;
      if (profile?.JSON_Data) {
        JSON_Data = JSON.parse(profile.JSON_Data);
        if (!JSON_Data.includes(item.uid)) {
          JSON_Data.push(item.uid);
          profile.JSON_Data = JSON.stringify(JSON_Data);
        }
      } else {
        JSON_Data.push(item.uid);
        profile.JSON_Data = JSON.stringify(JSON_Data);
      }
      this.setUserRegisteredProfileTemp(profile);
      this.JSON_Data = JSON_Data;
    },
    patchSharePointListItem() {
      let res = functions.patchSharePointListItem(
        this.site,
        this.accessToken,
        this.list,
        this.userRegisteredProfile.id,
        {
          fields: {
            Title: this.userProfile.userName,
            email: this.userEmail,
            organization: this.organization,
            JSON_Data: this?.JSON_Data ? JSON.stringify(this.JSON_Data) : null,
          },
        }
      );
      res.then((r) => {
        this.setUserRegisteredProfileTemp(r.fields);
        Swal.fire({
          title: "Profile Updated",
          text: this.dialogStep.title + " Progress Updated",
          icon: "success",
          confirmButtonText: "Cool",
        });
        this.setDialog = false;
        this.toggleReload();
      });
    },
    showActions: function (e) {
      try {
        return e.actions.length > 0;
      } catch {
        return false;
      }
    },
    handleDialog: function (e) {
      this.stepDisabled = true;
      e.step = this.achievementsList.map(e=>{return e.uid}).includes(e.uid)?"Yes":"";
      this.dialog2 = true;
      this.dialogStep = e;
    },
    updateProfile() {
      this.patchSharePointListItem();
      this.dialog2 = false;
    },
    isLinkAction(data) {
      return Array.isArray(data.uid.split("."))
        ? data.uid.split(".")[0] !== "profile"
        : false;
    },
    isProfileAction(data) {
      return Array.isArray(data.uid.split("."))
        ? data.uid.split(".")[0] === "profile"
        : false;
    },
    isComplete: function (data) {
      const value = data.item;
      if (!value && !data.achievementsList.length) return "";
      let res = false;
      try {
        res = data.achievementsList
          .map((e) => {
            return e.uid;
          })
          .includes(value.uid)
          ? true
          : false;
      } catch {
        res = false;
      }
      return res;
    },
    hasBuilder() {
      return this.builderEmailList.includes(
        this.userDetails.user.userPrincipalName
      );
    },
  },
  filters: {
    getImageSrc: function () {
      return "";
    },
    getId: function (data) {
      return data.id + Date.now();
    },
    isCompleteColor: function (value, data) {
      if (!value && !data.achievementsList.length) return "";
      let color = "";
      try {
        color = data.achievementsList
          .map((e) => {
            return e.uid;
          })
          .includes(value.uid)
          ? "success"
          : value.color;
      } catch (error) {
        color = value.color;
      }
      return color;
    },
    returnSelected: function (array, data) {
      let res = [];
      if (data.achievementsList.length < 1) return;
      array.forEach((item) => {
        if (
          data.achievementsList
            .map((e) => {
              return e.uid;
            })
            .includes(item.uid)
        ) {
          res.push(item.id);
        }
      });
      return res;
    },
  },
  created() {
    if (this.userRegisteredProfile?.JSON_Data) {
      this.JSON_Data = this.userRegisteredProfile?.JSON_Data
        ? JSON.parse(this.userRegisteredProfile.JSON_Data)
        : [];
    }
    let max = this.achievementsItems.length;
    let complete = 0;
    this.achievementsList.forEach((item) => {
      if (
        this.achievementsItems
          .map((e) => {
            return e.uid;
          })
          .includes(item.uid)
      ) {
        complete = complete + 1;
      }
    });

    let weight = 100 / max;
    if(complete === max){
         this.knowledge = 100;
      } else {
         this.knowledge =  Math.floor(weight * complete);
      }
  },
  watch: {
    achievementsList() {
      let max = this.achievementsItems.length;
      let complete = 0;
      this.achievementsList.forEach((item) => {
        if (
          this.achievementsItems
            .map((e) => {
              return e.uid;
            })
            .includes(item.uid)
        ) {
          complete = complete + 1;
        }
      });

      let weight = 100 / max;
      
      if(complete === max){
         this.knowledge = 100;
      } else {
         this.knowledge =  Math.floor(weight * complete);
      }
      this.setIsLoading(false);
    },
  },
};
</script>