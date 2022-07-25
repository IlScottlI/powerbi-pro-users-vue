<template>
  <v-item-group class="mt-10 mb-10 ps-5 pe-5" ref="main">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="card in stepupCards"
        :key="card.id"
      >
        <v-item>
          <stepup-card :cardId="card.id" />
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import StepupCard from "../components/training/StepupCard.vue";
import router from "../router";
export default {
  components: {
    StepupCard,
  },
  data: () => ({
    router,
  }),
  computed: {
    ...mapState(["stepupCards", "reload","achievementsList", "isLoading"]),
    ...mapGetters(["userRegistered", "userProfileFound", "userRegisteredProfile"]),
    dialog: {
      get() {
        return this.$store.state.dialog;
      },
      set(value) {
        this.setDialog(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setDialog", "setIsLoading","setAchievementListCombined"]),
    ...mapActions([
      "getUserDocsGameStatus",
      "getSharePointListConfigurationItems",
      "getSharePointListBUItems",
      "getSharePointListChampionItems",
      "getSharePointListItems",
    ]),
    tryLogin(n) {
      try {
        router.push({ name: n.name });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    //
  },
  mounted() {},
  watch: {
    userRegistered(val) {
      this.setDialog(!val);
    },
  },
};
</script>