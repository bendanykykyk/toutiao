<template>
  <div>
    <van-nav-bar left-arrow fixed @click-left="$router.back()"></van-nav-bar>

    <!-- 文章标签列表 -->
    <van-tabs
      class="fixed-tabs"
      v-model="active"
      title-active-color="#3c9bfa"
      color="#399afa"
      @click="clickTab"
    >
      <van-tab :title="tab.title" v-for="tab in tabs" :key="tab.title">
        <CHList :fn="tab.fn"></CHList>
      </van-tab>
    </van-tabs>
    <!-- /文章标签列表 -->
  </div>
</template>
<script>
import {
  getUserCollectArticles,
  getUserHistoryArticles
} from "network/profile";
import { NavBar, Tabs, Tab, List, Cell, Toast } from "vant";
import CHList from "./userListChild/chlist";
export default {
  name: "UserList",
  components: {
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    CHList
  },
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      active: this.getInitialActive(),
      tabs: [
        {
          title: "收藏",
          fn: getUserCollectArticles
        },
        {
          title: "历史",
          fn: getUserHistoryArticles
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    getInitialActive() {
      const active = ["collect", "history", undefined].indexOf(this.type);
      return active !== -1 ? active : 0;
    },

    clickTab(name) {
      //   this.tabs[name].fn().then(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
.fixed-tabs {
  margin-top: 46px;
}
</style>
