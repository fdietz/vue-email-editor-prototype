import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";

import "./styles/custom.scss";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
