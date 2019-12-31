import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faTimes,
  faCaretDown,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faParagraph,
  faUndo,
  faRedo,
  faArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";

import "./styles/custom.scss";
library.add(
  faCoffee,
  faTimes,
  faCaretDown,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faParagraph,
  faUndo,
  faRedo,
  faArrowsAlt
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
