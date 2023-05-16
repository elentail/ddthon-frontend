import { createStore } from "vuex";

// function getLocalStorageData(key, defaultValue) {
//   const storedValue = localStorage.getItem(key);
//   return storedValue ? JSON.parse(storedValue) : defaultValue;
// }

// localStorage에 데이터를 저장하는 함수
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const state = {
  // 여기에 state를 정의하세요
};

const getters = {
  loadLocalTheme() {
    let customTheme = localStorage.getItem("theme");
    if (!customTheme) {
      customTheme = "light";
      localStorage.setItem("theme", customTheme);
    }
    return customTheme;
  },
};

const mutations = {
  // 여기에 mutations를 정의하세요
  setAttemps(state, mode) {
    if (mode === 0) {
      state.attemps = 0;
    } else {
      state.attemps++;
    }
    saveToLocalStorage("attemps", state.attemps);
  },
  setToday(state, payload) {
    state.today = payload;
    saveToLocalStorage("today", payload);
  },
  setSimilarity(state, payload) {
    state.similarity = payload;
    saveToLocalStorage("similarity", payload);
  },
  setLocalTheme(state, customTheme) {
    localStorage.setItem("theme", customTheme);
  },
  setHistory(state, history) {
    state.history = history;
  },
  setRecentWord(state, payload) {
    state.recentWord = payload;
    if (payload.similarity > state.similarity.similarity) {
      this.commit("setSimilarity", payload);
    }
    saveToLocalStorage("recentWord", payload);
  },
};

const actions = {};

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default store;
