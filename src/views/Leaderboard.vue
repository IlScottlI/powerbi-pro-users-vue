<template>
  <v-row class="overflow-hidden pa-0 ma-0">
    <v-col cols="12">
      <v-card> 
      <v-row>
        <v-col cols="3" class="mx-3">
          <v-combobox
          clearable
          v-model="userlocation"
          :items="locations"
          label="Location"
          dense
          chips
          @change="handleLocationChange"
        ></v-combobox>
        </v-col>
        <v-col cols="3" class="mx-3">
          <v-combobox
          clearable
          v-model="userorganization"
          :items="organizations"
          label="Organization"
          dense
          chips
          @change="$store.dispatch('getSharePointListItems')"
        ></v-combobox>
        </v-col>
      </v-row>
      </v-card>
    </v-col>
    <v-col>
    <v-data-iterator
      :items="leaderboardItems"
      item-key="id"
      hide-default-footer
    >
      <template v-slot:default>
        <v-row>
          <v-col
            v-for="item in filterArray(leaderboardItems)"
            :key="item.id"
            cols="12"
            sm="12"
            md="6"
            lg="6"
            xl="4"
          >
            <leader-card :item="item" />
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    </v-col>
  </v-row>
</template>


<script>
import LeaderCard from "../components/LeaderCard.vue";
import "../styles/style.css";
import background from "../assets/profile-card-background.svg";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  components: {
    LeaderCard,
  },
  data: () => ({
    background,
    isLoading: true,
    arrays: [],
  }),
  methods: {
    ...mapActions([
      "getUserDocsProfile",
      "setUsername",
      "setLocation",
      "getUserDocsGameStatus",
      "getAchievementLookup",
      "getSharePointListConfigurationItems",
      "getSharePointListChampionItems",
    ]),
    ...mapMutations(["setListItems", "setIsLoading","setSelectedOrganizations","setuserorganization",]),
    filterArray: function (value) {
      return value.filter(e=>e.fields.displayOn != "False");
    },
    handleLocationChange(){
      this.userorganization = null;
    },
    filterOrgs(organizations){
      organizations
    },
  },
  computed: {
    ...mapGetters([
      "userProfileImage",
      "userProfileDisplayName",
      "userLevel",
      "userTotalPoints",
      "userBadges",
      "userPointsHigh",
      "userPointsLow",
      "leaderboardItems",
      "userRegistered",
    ]),
    ...mapState(["gamestatus", "listItems", "reload","organizations","locations",]),
    selectedOrganizations: {
      get() {
        return this.$store.state.selectedOrganizations;
      },
      set(value) {
        this.setSelectedOrganizations(value);
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
        this.$store.commit('setuserlocation', value);
      },
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
  mounted(){
    document.title = this.userlocation;
    this.$store.dispatch('getSharePointListBUItems');
  },
  watch: {
    leaderboardItems(leaderboardItems) {
      this.setListItems(leaderboardItems);
    },
    userlocation() {
      this.$store.dispatch('getSharePointListItems');
      this.$store.dispatch('getSharePointListBUItems');
    },
    reload() {
      this.getAchievementLookup();
      this.getSharePointListConfigurationItems();
      this.$store.dispatch('getSharePointListBUItems');
      this.getSharePointListChampionItems();
    },
  },
};
</script>