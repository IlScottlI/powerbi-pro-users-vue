<template>
  <section class="has-padding-top-medium">
    <!---->
    <section>
      <div class="hero has-background-docs">
        <div class="hero-background">
          <img
            :src="background"
            alt=""
            class="display-none display-block-tablet"
            data-linktype="absolute-path"
          />
          <img
            src="/en-us/media/profile/profile-card-bg-mobile.svg?branch=main"
            alt=""
            class="display-none-tablet"
            data-linktype="absolute-path"
          />
        </div>
        <div class="hero-card padding-none padding-xxs-tablet has-border-none">
          <div class="padding-sm">
            <div class="media">
              <figure class="media-left image is-64x64 is-96x96-tablet">
                <img
                  class="is-rounded is-hidden-mobile"
                  style="border: 5px solid #ffffff"
                  alt=""
                  :src="userProfileImage | getImageSrc"
                />
                <img
                  class="is-rounded is-hidden-tablet"
                  style="border: 3px solid #ffffff"
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGNEY1RjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQuMTE4NjUgMjYuNzE2MkM2LjE0MzYgMjIuMTY5NyAxMC43MDE2IDE5IDE2IDE5QzIxLjI5ODMgMTkgMjUuODU2NCAyMi4xNjk3IDI3Ljg4MTMgMjYuNzE2MkMyNC45NTMxIDI5Ljk2MDggMjAuNzE0NyAzMiAxNiAzMkMxMS4yODUzIDMyIDcuMDQ2ODkgMjkuOTYwOCA0LjExODY1IDI2LjcxNjJaTTIzIDEwQzIzIDEzLjg2NiAxOS44NjYgMTcgMTYgMTdDMTIuMTM0IDE3IDguOTk5OTkgMTMuODY2IDguOTk5OTkgMTBDOC45OTk5OSA2LjEzNDAxIDEyLjEzNCAzIDE2IDNDMTkuODY2IDMgMjMgNi4xMzQwMSAyMyAxMFoiIGZpbGw9IiNCOEI5QkEiLz48L3N2Zz4="
                />
              </figure>
              <div
                class="
                  media-content
                  font-size-sm
                  has-text-docs-invert
                  margin-top-md
                  is-hidden-mobile
                "
              >
                <header>
                  <h1 class="is-size-h3 is-inline-block padding-left-xxs">
                    {{ userProfileDisplayName }}
                  </h1>
                  <span
                    class="
                      margin-left-xxs-tablet
                      padding-left-xxs padding-right-xxs
                      border-radius-lg
                      has-background-docs
                    "
                  >
                  </span>

                  <div class="display-flex" hidden="">
                    <div
                      class="
                        has-background-docs
                        font-size-xs
                        margin-top-xxs
                        padding-left-xxs padding-right-xxs
                        border-radius-lg
                        is-comma-delimited
                      "
                    ></div>
                  </div>
                </header>
              </div>
              <div class="media-content has-text-docs-invert is-hidden-tablet">
                <header>
                  <h1 class="is-size-h7 padding-left-xxs">
                    {{ userProfileDisplayName }}
                  </h1>
                  <div class="display-flex has-line-height-reset">
                    <div
                      class="
                        has-background-docs
                        font-size-xs
                        margin-top-xxs
                        padding-left-xxs padding-right-xxs
                        border-radius-lg
                        is-comma-delimited
                      "
                    ></div>
                  </div>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="
          hero-foot
          box
          padding-xxs
          margin-bottom-sm margin-bottom-md-tablet
        "
        style="background: black"
      >
        <div
          class="
            columns
            is-gapless-mobile is-mobile is-multiline
            has-line-height-reset
            padding-left-xs
          "
        >
          <div
            class="
              column
              is-4-mobile is-1-tablet is-flex
              justify-content-flex-start-tablet
            "
          >
            <!---->
            <dl
              class="
                padding-xxs padding-xs-tablet
                display-flex
                flex-direction-column-reverse
                has-flex-justify-content-end
              "
            >
              <dt class="font-size-xs subtle">
                <p class="display-flex justify-content-center">Badges</p>
              </dt>
              <dd
                class="
                  has-text-weight-bold
                  is-size-large
                  has-no-wrap
                  margin-bottom-xxs
                "
              >
                <!---->{{userBadges.length}}<!---->
              </dd>
            </dl>
            <!---->
          </div>
          <div
            class="
              column
              is-4-mobile is-1-tablet is-flex
              justify-content-flex-start-tablet
            "
          >
            <!---->
            <dl
              class="
                padding-xxs padding-xs-tablet
                display-flex
                flex-direction-column-reverse
                has-flex-justify-content-end
              "
            >
              <dt class="font-size-xs subtle">
                <p class="display-flex justify-content-center">Trophies</p>
              </dt>
              <dd
                class="
                  has-text-weight-bold
                  is-size-large
                  has-no-wrap
                  margin-bottom-xxs
                "
              >
                <!---->4<!---->
              </dd>
            </dl>
            <!---->
          </div>

          <v-spacer></v-spacer>
          <div class="column is-full-mobile is-6-desktop">
            <!---->
            <div
              id="level-status-container"
              class="
                display-flex-tablet
                justify-content-flex-end-tablet
                align-items-center
                is-full-height
                margin-bottom-xxs margin-top-xs margin-top-none-tablet
              "
            >
              <div
                id="level-status"
                class="
                  position-relative
                  level
                  is-mobile
                  margin-none
                  justify-content-flex-start
                  padding-bottom-sm-mobile
                  padding-bottom-sm-mobile
                  padding-right-md-desktop
                  padding-right-md-tablet
                  padding-top-md-mobile
                  padding-left-xxs
                  padding-left-none-tablet
                "
              >
                <span
                  id="level-status-text"
                  class="
                    font-size-xs
                    has-text-wrap
                    is-inline-truncated is-uppercase
                    font-weight-semibold
                  "
                >
                  Level {{ userLevel }}
                </span>
                <span
                  id="level-status-progress-container"
                  class="hexagonal-progress"
                >
                  <progress
                    id="level-status-progress"
                    class="
                      progress
                      is-inline-block
                      position-relative
                      is-success
                    "
                    :min="userPointsLow"
                    :max="userPointsHigh"
                    :value="userTotalPoints"
                  >
                  </progress>
                  <span class="hexagonal-progress-marker"></span>
                </span>
                <span
                  id="level-status-points"
                  class="
                    font-size-xs
                    has-text-wrap
                    is-inline-truncated is-uppercase
                  "
                >
                  <span class="font-weight-semibold">{{userTotalPoints}}</span
                  >/{{ userPointsHigh }}
                  XP
                </span>
              </div>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </section>
    <!---->
  </section>
</template>

<script>
import "../styles/style.css";
import background from "../assets/profile-card-background.svg";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    background,
  }),
  computed: {
    ...mapGetters(["userProfileImage", "userProfileDisplayName", "userLevel", "userTotalPoints","userBadges", "userPointsHigh", "userPointsLow"]),
    ...mapState(["gamestatus"]),
  },
  methods: {
    ...mapActions(["getUserDocsProfile", "setUsername"]),
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
    //
  },
};
</script>