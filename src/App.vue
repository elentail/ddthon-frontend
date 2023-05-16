<template>
  <v-app id="inspire">
    <v-app-bar density="compact" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>패스 파인터</v-app-bar-title>

      <v-btn icon @click="toogleTheme">
        <img src="@/assets/img/theme.png" width="24" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer width="244" permanent>
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab value="one">출근</v-tab>
        <v-tab value="two">퇴근</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-card rounded="md" border="md" class="mx-auto" variant="outlined">
              <v-card-text class="pa-4">
                <v-text-field v-model="searchToken" density="compact" label="검색" single-line hide-details></v-text-field>
              </v-card-text>
              <v-card-subtitle>
                <v-alert border="start" type="info" border-color="deep-purple accent-4" density="compact"
                  class="font-weight-black">
                  <template #prepend>
                    @검색 결과 >
                  </template>
                </v-alert>
              </v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary">
                  힌트가 필요하세요?
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-window-item>

          <v-window-item value="two">
            Two
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col col="8">
            <KakaoMap></KakaoMap>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app absolute class="d-flex flex-column" density="compact">
      <div>
        <v-btn v-for="icon in icons" size="small" :key="icon" :icon="icon" variant="text" @click="kakaoShare"></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";
import { onMounted, ref } from "vue";
// import { useStore } from "vuex";
import KakaoMap from "./components/KakaoMap.vue";

export default {
  name: "App",
  components: {
    KakaoMap,
  },
  setup() {
    // const store = useStore();
    const theme = useTheme();
    const drawer = ref(true);
    const tab = ref("one");
    const kakaoShare = () => {
      window.Kakao.Share.sendCustom({
        templateId: 92017,
        // 카카오톡이 설치 되지 않았을때 마켓으로 이동
        installTalk: true
      });
    };

    const toogleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
      const customTheme = localStorage.setItem(
        "theme",
        theme.global.name.value
      );
      return customTheme;
    };
    const links = ["Dashboard", "Messages", "Profile", "Updates"];

    onMounted(() => {
      let customTheme = localStorage.getItem("theme");
      if (!customTheme) {
        customTheme = "dark";
        localStorage.setItem("theme", customTheme);
      }
      theme.global.name.value = customTheme;
      // store.dispatch('loadHistoryFromDB');
    });
    return {
      links,
      toogleTheme,
      kakaoShare,
      drawer,
      tab
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");

#app {
  font-family: "Nanum Gothic", sans-serif;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
