<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="120"
    transition="fade-transition"
  >
    <v-card class="mx-auto pa-1" tile v-if="!isLoading && gamestatus" :item="item">
      <v-img height="180" :src="background">
        <v-row>
          <v-col>
            <v-avatar class="profile ma-2 absolute" color="grey" size="80" tile>
              <v-img :src="item.avatarUrl | getImageSrc"></v-img>
            </v-avatar>
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ item.displayName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  $attrs.item.fields.organization
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col>
            <v-img :src="$attrs.item.icon">
              <span
                style="
                  background: rgba(0, 0, 0, 0.8);
                  justify-content: center;
                  text-align: center;
                  display: block;
                  font-size: x-large;
                  padding: 0.5rem;
                "
                >{{ $attrs.item.totalPoints }}</span
              >
            </v-img>
          </v-col>
        </v-row>
            <v-btn
            color="transparent"
              fab
              bottom
              right
              absolute
              class="mb-10"
              title="Builder Badge"
            >
              <v-img style="width: 30px" :src="'KNOWLEDGE WORKER' | returnBool(builderEmailList, wizardEmailList, masterEmailList,$attrs.item.fields.email)"></v-img>
            </v-btn>
            <v-btn
            color="transparent"
              fab
              bottom
              right
              absolute
              class="mb-10 me-10"
              title="Wizard Badge"
            >
              <v-img style="width: 30px" :src="'POWER USER' | returnBool(builderEmailList, wizardEmailList, masterEmailList,$attrs.item.fields.email)"></v-img>
            </v-btn>
            <v-btn
            color="transparent"
              fab
              bottom
              right
              absolute
              class="mb-10 me-16 pe-10"
              title="Master Badge"
            >
              <v-img style="width: 30px" :src="'EXPERT USER' | returnBool(builderEmailList, wizardEmailList, masterEmailList,$attrs.item.fields.email)"></v-img>
            </v-btn>
      </v-img>
      <v-card-actions style="background:rgba(0,0,0,1)">
          
          <span
            id="level-status-progress-container"
            class="hexagonal-progress"
            style="min-width: 10rem !important"
          >
            <progress
              id="level-status-progress"
              class="progress is-inline-block position-relative is-success"
              style="min-width: 10rem !important"
              :min="gamestatus.level.pointsLow"
              :max="gamestatus.level.pointsHigh"
              :value="gamestatus.totalPoints"
            ></progress>
            <span class="hexagonal-progress-marker"></span>
          </span>
          Level {{ gamestatus.level.levelNumber }}
          <span
            id="level-status-points"
            class="font-size-xs has-text-wrap is-inline-truncated is-uppercase ms-3"
          >
            <span class="font-weight-semibold">{{
              gamestatus.totalPoints
            }}</span
            >/{{ gamestatus.level.pointsHigh }}
            XP
          </span>
          <v-spacer/>
          <v-btn
            :href="
              'https://docs.microsoft.com/en-us/users/' +
              $attrs.item.fields.Title
            "
            target="_blank"
            icon
            elevation="2"
            fab
            large
            dark
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-skeleton-loader
        height="280"
        class="mx-auto"
        type="card"
      ></v-skeleton-loader>
    </v-card>
  </v-lazy>
</template>

<script>
import functions from "../utils/functions.js";
import "../styles/style.css";
import background from "../assets/profile-card-background.svg";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    background,
    item: null,
    isActive: false,
    gamestatus: null,
  }),
  computed: {
    ...mapGetters([
      "userProfileImage",
      "userProfileDisplayName",
      "userLevel",
      "userTotalPoints",
      "userBadges",
      "userPointsHigh",
      "userPointsLow",
      "builderEmailList",
      "wizardEmailList",
      "masterEmailList",
      "userEmail",
    ]),
    ...mapState(["listItems","isLoading", "reload"]),
  },
  created(){
    //   document.addEventListener("visibilitychange", this.visibilityChange, false);
  },
  mounted() {
    this.visibilityChange();
  },
  methods: {
    ...mapActions(["getUserDocsProfile", "setUsername", ]),
    ...mapMutations(["setListItems","setIsLoading"]),
    getUserDocsGameStatus: async function (value) {
      let res = await functions.getUserDocsGameStatus(value);
      return res;
    },
    getProfile: async function (value) {
      let res = await functions.getUserDocsProfile(value);
      this.item = res;
      let gs = this.getUserDocsGameStatus(res.userId);
      gs.then((e) => {
        this.gamestatus = e;
        this.setIsLoading(false);
      });
    },
    visibilityChange() {
      if (!document.hidden) {
        this.setIsLoading(true);
        this.item = this.getProfile(this.$attrs.item.fields.Title);
      }
    },
  },
  filters: {
    getImageSrc: function (value) {
      let image = "";
      try {
        if (value.length < 1) {
          image =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGNEY1RjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQuMTE4NjUgMjYuNzE2MkM2LjE0MzYgMjIuMTY5NyAxMC43MDE2IDE5IDE2IDE5QzIxLjI5ODMgMTkgMjUuODU2NCAyMi4xNjk3IDI3Ljg4MTMgMjYuNzE2MkMyNC45NTMxIDI5Ljk2MDggMjAuNzE0NyAzMiAxNiAzMkMxMS4yODUzIDMyIDcuMDQ2ODkgMjkuOTYwOCA0LjExODY1IDI2LjcxNjJaTTIzIDEwQzIzIDEzLjg2NiAxOS44NjYgMTcgMTYgMTdDMTIuMTM0IDE3IDguOTk5OTkgMTMuODY2IDguOTk5OTkgMTBDOC45OTk5OSA2LjEzNDAxIDEyLjEzNCAzIDE2IDNDMTkuODY2IDMgMjMgNi4xMzQwMSAyMyAxMFoiIGZpbGw9IiNCOEI5QkEiLz48L3N2Zz4=";
        } else {
          image = value;
        }
      } catch (error) {
        image =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGNEY1RjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQuMTE4NjUgMjYuNzE2MkM2LjE0MzYgMjIuMTY5NyAxMC43MDE2IDE5IDE2IDE5QzIxLjI5ODMgMTkgMjUuODU2NCAyMi4xNjk3IDI3Ljg4MTMgMjYuNzE2MkMyNC45NTMxIDI5Ljk2MDggMjAuNzE0NyAzMiAxNiAzMkMxMS4yODUzIDMyIDcuMDQ2ODkgMjkuOTYwOCA0LjExODY1IDI2LjcxNjJaTTIzIDEwQzIzIDEzLjg2NiAxOS44NjYgMTcgMTYgMTdDMTIuMTM0IDE3IDguOTk5OTkgMTMuODY2IDguOTk5OTkgMTBDOC45OTk5OSA2LjEzNDAxIDEyLjEzNCAzIDE2IDNDMTkuODY2IDMgMjMgNi4xMzQwMSAyMyAxMFoiIGZpbGw9IiNCOEI5QkEiLz48L3N2Zz4=";
      }
      return image;
    },
  },
  watch: {
      reload(){
        this.visibilityChange();
      },
    gamestatus(e) {
      let listItems = [];
      for (let i = 0; i < this.listItems.length; i++) {
        if (this.$attrs.item.fields.email == this.listItems[i].fields.email) {
          listItems[i] = this.listItems[i];
          listItems[i].totalPoints = e.totalPoints;
        } else {
          listItems[i] = this.listItems[i];
        }
      }
      this.setListItems(listItems);
    },
  },
};
</script>