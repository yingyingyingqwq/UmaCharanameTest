import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { useSSRContext, mergeProps, withCtx, createTextVNode, unref } from 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { defineStore } from 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/pinia/dist/pinia.prod.cjs';
import { LocalStorage } from 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/quasar/dist/quasar.server.prod.js';
import { _ as __nuxt_component_0$2 } from './nuxt-link-D4G_wtIy.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/devalue/index.js';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/@unhead/ssr/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/unhead/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/unenv/runtime/fetch/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/@unhead/shared/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/%E7%8E%8B%E5%9B%BD%E6%96%8C/OneDrive/UmaCharanameTest/node_modules/vue-router/dist/vue-router.node.mjs';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$2 = {
  props: {
    startTime: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentTime: Date.now()
    };
  },
  computed: {
    elapsedTime() {
      return this.currentTime - this.startTime;
    },
    formattedTime() {
      const totalSeconds = Math.floor(this.elapsedTime / 1e3);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  },
  mounted() {
    this.timer = setInterval();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "timer" }, _attrs))} data-v-fd6d15eb>${ssrInterpolate($options.formattedTime)}</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TimerDisplay.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-fd6d15eb"]]);
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1e3);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};
defineStore("history", {
  state: () => ({
    records: LocalStorage.getItem("game-history") || []
  }),
  actions: {
    addRecord(record) {
      this.gameHistory.push(record);
      LocalStorage.set("game-history", this.records);
    }
  }
});
const useGameStore = defineStore("game", {
  state: () => ({
    gameHistory: []
  }),
  actions: {
    addHistory(record) {
      this.gameHistory.push(record);
    }
  }
});
const useHistoryStore = defineStore("history", {
  state: () => ({
    records: []
  }),
  actions: {
    addRecord(record) {
      this.records.unshift({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...record
      });
    }
  }
});
const useSettingsStore = defineStore("settings", {
  state: () => ({
    allowContinueOnError: false,
    random30: false
  }),
  persist: true
});
const _sfc_main$1 = {
  setup() {
    const history = useHistoryStore();
    const settings = useSettingsStore();
    return { history, settings };
  },
  components: {
    TimerDisplay: __nuxt_component_0$1
  },
  props: {
    mode: {
      type: String,
      default: "normal"
    }
  },
  data() {
    return {
      characters: [],
      currentIndex: 0,
      userInput: "",
      startTime: null,
      totalTime: null,
      stopTime: null,
      gameStarted: false,
      displayTime: true,
      correctCount: 0,
      isError: false
    };
  },
  computed: {
    currentCharacter() {
      return this.characters[this.currentIndex];
    },
    formattedTime() {
      return formatTime(this.totalTime);
    },
    accuracy() {
      return Math.round(this.correctCount / this.characters.length * 100);
    },
    correctCount() {
      return this.correctCount;
    },
    mainColor() {
      return this.currentCharacter.mainColor;
    },
    subColor() {
      return this.currentCharacter.subColor;
    },
    progressPercentage() {
      return (this.currentIndex + 1) / this.characters.length * 100;
    },
    progressText() {
      return `${this.currentIndex + 1}/${this.characters.length}`;
    }
  },
  methods: {
    async startGame() {
      const nuxtApp = useNuxtApp();
      this.characters = await nuxtApp.$dataLoader.loadCharacters();
      if (this.characters.length === 0) return;
      this.shuffleCharacters();
      if (this.settings.random30) {
        this.characters = this.characters.slice(0, 30);
      }
      this.gameStarted = true;
      this.displayTime = true;
      this.startTime = Date.now();
    },
    getImageUrl(imageName) {
      return new URL(`/assets/images/characters/${imageName}`, globalThis._importMeta_.url).href;
    },
    shuffleCharacters() {
      for (let i = this.characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.characters[i], this.characters[j]] = [this.characters[j], this.characters[i]];
      }
    },
    checkAnswer() {
      const target = this.mode === "normal" ? this.currentCharacter.names : this.currentCharacter.seiyuu;
      const validAnswers = [
        target.jp,
        target.zh,
        target.en,
        ...target.aliases || []
      ].map((str) => str.toLowerCase().trim());
      if (validAnswers.includes(this.userInput.toLowerCase().trim())) {
        this.correctCount++;
        this.nextCharacter();
      } else {
        this.handleError();
      }
    },
    handleError() {
      if (this.settings.allowContinueOnError) {
        this.nextCharacter();
      } else {
        this.isError = true;
        setTimeout(() => this.isError = false, 1e3);
      }
    },
    nextCharacter() {
      if (this.currentIndex < this.characters.length - 1) {
        this.currentIndex++;
        this.userInput = "";
      } else {
        this.endGame();
      }
    },
    endGame() {
      this.displayTime = false;
      this.totalTime = Date.now() - this.startTime;
      this.currentIndex = this.characters.length;
      const gameStore = useGameStore();
      gameStore.addHistory({
        mode: this.mode,
        time: this.totalTime,
        date: (/* @__PURE__ */ new Date()).toISOString()
      });
      this.history.addRecord({
        mode: this.mode,
        time: this.totalTime,
        accuracy: this.accuracy,
        correctCount: this.correctCount,
        charaTotal: this.characters.length
      });
    },
    restartGame() {
      this.gameStarted = false;
      this.displayTime = true;
      this.currentIndex = 0;
      this.userInput = "";
      this.correctCount = 0;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TimerDisplay = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "game-container" }, _attrs))} data-v-6714d513>`);
  if (!$data.gameStarted) {
    _push(`<div class="start-screen" data-v-6714d513><h2 data-v-6714d513>${ssrInterpolate($props.mode === "normal" ? "\u9A6C\u6279\u6D53\u5EA6\u6D4B\u8BD5\u5668" : "\u9A6C\u6279\u6D53\u5EA6\u6D4B\u8BD5\u5668 - \u58F0\u4F18\u5403\u6A21\u5F0F")}</h2>`);
    if (!$data.gameStarted) {
      _push(`<div class="settings" data-v-6714d513><div class="checkbox-container" data-v-6714d513><div data-v-6714d513><label class="ios-checkbox green" data-v-6714d513><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray($setup.settings.random30) ? ssrLooseContain($setup.settings.random30, null) : $setup.settings.random30) ? " checked" : ""} data-v-6714d513><div class="checkbox-wrapper" data-v-6714d513><div class="checkbox-bg" data-v-6714d513></div><svg fill="none" viewBox="0 0 24 24" class="checkbox-icon" data-v-6714d513><path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="currentColor" d="M4 12L10 18L20 6" class="check-path" data-v-6714d513></path></svg></div></label> \u968F\u673A30\u4E2A\u89D2\u8272 </div><div data-v-6714d513><label class="ios-checkbox green" data-v-6714d513><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray($setup.settings.allowContinueOnError) ? ssrLooseContain($setup.settings.allowContinueOnError, null) : $setup.settings.allowContinueOnError) ? " checked" : ""} data-v-6714d513><div class="checkbox-wrapper" data-v-6714d513><div class="checkbox-bg" data-v-6714d513></div><svg fill="none" viewBox="0 0 24 24" class="checkbox-icon" data-v-6714d513><path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="currentColor" d="M4 12L10 18L20 6" class="check-path" data-v-6714d513></path></svg></div></label> \u4E0D\u6821\u9A8C\u7B54\u6848 </div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<button data-v-6714d513>\u5F00\u59CB\u6311\u6218</button></div>`);
  } else {
    _push(`<!--[-->`);
    if ($data.gameStarted & $data.displayTime) {
      _push(ssrRenderComponent(_component_TimerDisplay, { startTime: $data.startTime }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if ($data.gameStarted && $options.currentCharacter) {
      _push(`<div class="progress-container" data-v-6714d513><div class="progress-text" data-v-6714d513>${ssrInterpolate($options.progressText)}</div><div class="progress-bar" data-v-6714d513><div class="progress-fill" style="${ssrRenderStyle({
        width: $options.progressPercentage + "%",
        backgroundColor: $options.subColor
      })}" data-v-6714d513></div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($options.currentCharacter) {
      _push(`<div class="character-card" data-v-6714d513><li class="charaContainer" style="${ssrRenderStyle({ "transition-delay": "0s" })}" data-v-6714d513><a data-v-2ed22295="" data-v-edf74022="" class="charaALink" style="${ssrRenderStyle({ "--color-main": $options.mainColor, "--color-sub": $options.subColor })}" data-v-6714d513><div class="charaInner" data-v-6714d513><dl class="charaDl" data-v-6714d513><dt class="charaDt" data-v-6714d513><div class="dt-img" data-v-6714d513><picture class="img-loaded" data-v-6714d513><img${ssrRenderAttr("src", $options.getImageUrl($options.currentCharacter.image))} width="100%" data-v-6714d513></picture></div><div class="dt-bg" data-v-6714d513><p class="font-weight-bold" data-v-6714d513>${ssrInterpolate($props.mode === "normal" ? "Umamusume" : $options.currentCharacter.names.en)}</p></div></dt><dd class="charaDd" data-v-6714d513><p class="name" data-v-6714d513>`);
      if ($props.mode === "normal") {
        _push(`<div class="input-container" data-v-6714d513><div data-v-6714d513><input placeholder="\u4E2D\u6587\u540D/\u65E5\u6587\u540D/\u82F1\u6587\u540D" type="text"${ssrRenderAttr("value", $data.userInput)} class="${ssrRenderClass([{ "error-shake": $data.isError }, "input-field"])}" data-v-6714d513><label for="input-field" class="input-label" data-v-6714d513></label><span class="input-highlight" style="${ssrRenderStyle({ "background-color": $options.subColor })}" data-v-6714d513></span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($props.mode === "seiyuu") {
        _push(`<div data-v-6714d513>${ssrInterpolate($options.currentCharacter.names.zh)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
      if ($props.mode === "seiyuu") {
        _push(`<div class="cv" data-v-6714d513><p class="charaP" data-v-6714d513><span class="charaSpan" data-v-6714d513>CV:</span><input placeholder="\u4E2D\u6587\u540D/\u65E5\u6587\u540D/\u82F1\u6587\u540D" type="text"${ssrRenderAttr("value", $data.userInput)} class="${ssrRenderClass([{ "error-shake": $data.isError }, "input-field"])}" style="${ssrRenderStyle({ "text-align": "left", "color": "#505050" })}" data-v-6714d513><label for="input-field" class="input-label" data-v-6714d513></label><span class="input-highlight" style="${ssrRenderStyle({ "background-color": $options.subColor })}" data-v-6714d513></span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</dd></dl></div></a></li><button class="submit-button" data-v-6714d513>\u63D0\u4EA4</button></div>`);
    } else {
      _push(`<div class="result-screen" data-v-6714d513><h3 data-v-6714d513>\u6311\u6218\u5B8C\u6210\uFF01</h3><p data-v-6714d513>\u7528\u65F6\uFF1A${ssrInterpolate($options.formattedTime)}</p>`);
      if (this.settings.allowContinueOnError) {
        _push(`<p data-v-6714d513>\u6B63\u786E\u7387\uFF1A${ssrInterpolate($options.accuracy)}%</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p data-v-6714d513>\u6B63\u786E\u6570\uFF1A${ssrInterpolate($options.correctCount)}/${ssrInterpolate(this.characters.length)}</p><div class="history-list" data-v-6714d513><h4 data-v-6714d513>\u5386\u53F2\u8BB0\u5F55</h4><!--[-->`);
      ssrRenderList($setup.history.records, (record, index) => {
        _push(`<div class="history-item" data-v-6714d513><p data-v-6714d513>${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(record.timestamp))}</p><p data-v-6714d513>\u6A21\u5F0F\uFF1A${ssrInterpolate(record.mode === "normal" ? "\u89D2\u8272\u6A21\u5F0F" : "\u58F0\u4F18\u6A21\u5F0F")}</p><p data-v-6714d513>\u7528\u65F6\uFF1A${ssrInterpolate(("formatTime" in _ctx ? _ctx.formatTime : unref(formatTime))(record.time))}</p><p data-v-6714d513>\u6B63\u786E\u7387\uFF1A${ssrInterpolate(record.accuracy)}%</p><p data-v-6714d513>\u6B63\u786E\u6570\uFF1A${ssrInterpolate(record.correctCount)}/${ssrInterpolate(record.charaTotal)}</p></div>`);
      });
      _push(`<!--]--></div></div>`);
    }
    _push(`<!--]-->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GameBoard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-6714d513"]]);
const _sfc_main = {
  computed: {
    mode() {
      return this.$route.query.mode || "normal";
    }
  },
  head() {
    return {
      title: this.mode === "normal" ? "\u89D2\u8272\u6A21\u5F0F" : "\u58F0\u4F18\u6A21\u5F0F"
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_GameBoard = __nuxt_component_0;
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "game-page" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_GameBoard, { mode: $options.mode }, null, _parent));
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/",
    class: "back-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u8FD4\u56DE\u9996\u9875`);
      } else {
        return [
          createTextVNode("\u8FD4\u56DE\u9996\u9875")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const game = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { game as default };
//# sourceMappingURL=game-Bj_3_hLL.mjs.map
