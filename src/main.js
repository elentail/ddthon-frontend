import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDataTableVirtual } from "vuetify/labs/VDataTable";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// JS SDK init
const KAKAKO_API_KEY = "180c9b22cc75bb9c8b1396913ae96cc9";
window.Kakao.init(KAKAKO_API_KEY);

const vuetify = createVuetify({
  components: { ...components, VDataTableVirtual },
  directives,
});

createApp(App).use(store).use(vuetify).mount("#app");
