import Vue from "vue";
import dayjs from "dayjs";
require("dayjs/locale/zh-cn");
// 安装相对时间插件
var relativeTime = require("dayjs/plugin/relativeTime");
// 加载语言配置 中文
dayjs.locale("zh-cn"); // 全局使用

dayjs.extend(relativeTime);

Vue.prototype.$day = dayjs;
