import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 加载全局样式
import "style/index.less";
// 自动设置 REM 基准值 （html 标签字体大小）
import "amfe-flexible";
Vue.config.productionTip = false;

// 把 App 根组件渲染/替换到 #app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
